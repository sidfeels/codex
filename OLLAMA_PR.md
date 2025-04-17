# Ollama Support for Codex

This PR adds support for Ollama models in Codex. It builds on the framework established in the previous PR.

## Changes in this PR

1. **Ollama Agent Loop Implementation**: Implemented the `BaseAgentLoop` interface for Ollama models in `src/utils/agent/ollama-agent-loop.ts`.

2. **Ollama Client**: Added a client for communicating with the Ollama API in `src/utils/ollama-client.ts`.

3. **Model Detection**: Updated the model detection logic in `src/utils/model-utils.ts` to detect Ollama models.

4. **Configuration**: Added Ollama-specific configuration options in `src/utils/config.ts`.

5. **Model Overlay**: Updated the model overlay to display Ollama models.

6. **Tests**: Added tests for Ollama functionality.

## How It Works

1. **Model Detection**: Ollama models are detected by their prefix (e.g., `ollama:gemma3:1b`).

2. **API Communication**: The Ollama client communicates with the Ollama API to fetch models and generate responses.

3. **Function Calling**: The Ollama agent loop implements function calling by parsing the model's response text.

4. **Configuration**: Users can configure the Ollama API URL and other settings in their Codex configuration.

## Usage

To use an Ollama model:

1. Install Ollama and start the Ollama server.
2. Pull the desired model using `ollama pull gemma3:1b` (or any other model).
3. Run Codex with the Ollama model: `codex --model ollama:gemma3:1b`.

## Future Improvements

- Improve function calling reliability for Ollama models.
- Add support for more Ollama features like model parameters.
- Optimize token counting for Ollama models.
