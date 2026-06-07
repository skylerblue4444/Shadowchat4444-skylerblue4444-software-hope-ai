/**
 * Queue Engine - Job queues, background tasks, async processing
 */
import { EventEmitter } from 'events';

type JobStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'retry';

interface Job<T = any> {
  id: string;
  type: string;
  data: T;
  status: JobStatus;
  attempts: number;
  maxAttempts: number;
  priority: number;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  error?: string;
  result?: any;
}

class QueueEngine extends EventEmitter {
  private queues: Map<string, Job[]> = new Map();
  private processing: Set<string> = new Set();
  private handlers: Map<string, (job: Job) => Promise<any>> = new Map();

  enqueue<T>(type: string, data: T, priority: number = 0, maxAttempts: number = 3): Job<T> {
    const job: Job<T> = {
      id: `job_${Date.now()}_${Math.random()}`,
      type,
      data,
      status: 'pending',
      attempts: 0,
      maxAttempts,
      priority,
      createdAt: new Date(),
    };

    if (!this.queues.has(type)) {
      this.queues.set(type, []);
    }

    const queue = this.queues.get(type)!;
    queue.push(job);
    queue.sort((a, b) => b.priority - a.priority);

    this.emit('job:enqueued', job);
    return job;
  }

  registerHandler(jobType: string, handler: (job: Job) => Promise<any>): void {
    this.handlers.set(jobType, handler);
  }

  async process(jobType: string, concurrency: number = 1): Promise<void> {
    const queue = this.queues.get(jobType) || [];
    const handler = this.handlers.get(jobType);

    if (!handler) {
      throw new Error(`No handler registered for job type: ${jobType}`);
    }

    while (queue.length > 0 && this.processing.size < concurrency) {
      const job = queue.shift();
      if (!job) break;

      this.processing.add(job.id);
      job.status = 'processing';
      job.startedAt = new Date();
      job.attempts++;

      try {
        this.emit('job:processing', job);
        const result = await handler(job);
        job.status = 'completed';
        job.result = result;
        job.completedAt = new Date();
        this.emit('job:completed', job);
      } catch (error: any) {
        job.error = error.message;

        if (job.attempts < job.maxAttempts) {
          job.status = 'retry';
          queue.push(job);
          this.emit('job:retry', job);
        } else {
          job.status = 'failed';
          job.completedAt = new Date();
          this.emit('job:failed', job);
        }
      } finally {
        this.processing.delete(job.id);
      }
    }
  }

  getJob(jobId: string): Job | null {
    for (const queue of this.queues.values()) {
      const job = queue.find((j) => j.id === jobId);
      if (job) return job;
    }
    return null;
  }

  getQueueStats(jobType: string): { pending: number; processing: number } {
    const queue = this.queues.get(jobType) || [];
    return {
      pending: queue.filter((j) => j.status === 'pending').length,
      processing: queue.filter((j) => j.status === 'processing').length,
    };
  }
}

export { QueueEngine, Job, JobStatus };
