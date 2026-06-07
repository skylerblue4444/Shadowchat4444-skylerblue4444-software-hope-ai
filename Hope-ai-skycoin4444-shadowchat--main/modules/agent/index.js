const AI = require("../ai");

module.exports = {
  async run(input) {
    const plan = ["parse", "decide", "execute", "respond"];

    const ai = await AI.run(input);

    return {
      input,
      plan,
      output: ai.output,
      mode: "agent-v-unified"
    };
  }
};
