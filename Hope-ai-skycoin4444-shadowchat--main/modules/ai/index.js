module.exports = {
  async run(input, model = "local") {
    return {
      model,
      input,
      output: `[SAMS AI RESPONSE] ${input}`,
      version: "v1-v23-unified"
    };
  }
};
