# Model Framework Refactoring

This PR implements a framework for supporting multiple model providers in Codex. It's the first of two PRs that will add support for Ollama models.

## Changes in this PR

1. **Created a base interface for agent loops**: Added `BaseAgentLoop` interface in `src/utils/agent/base-agent-loop.ts` that defines the common API that all model providers must implement.

2. **Refactored OpenAI implementation**: Moved the OpenAI-specific implementation to `src/utils/agent/openai-agent-loop.ts` and made it implement the `BaseAgentLoop` interface.

3. **Added factory function**: Created a factory function in `src/utils/model-utils.ts` that creates the appropriate agent loop based on the model name.

4. **Updated references**: Updated all places in the codebase that reference `AgentLoop` to use the factory function and the interface.

5. **Maintained backward compatibility**: The original `agent-loop.ts` file now re-exports from the new files to maintain backward compatibility.

## Design Decisions

- **Interface-Based Design**: Using interfaces to define contracts between components is a fundamental software engineering principle that allows for clean separation of concerns.

- **Factory Pattern**: The factory pattern allows for creating different implementations based on the model name, which makes it easy to add support for new model providers in the future.

- **Backward Compatibility**: The original `AgentLoop` class is still available for backward compatibility, but it now delegates to the new implementation.

## Next Steps

In a follow-up PR, I'll add support for Ollama models by implementing the `BaseAgentLoop` interface for Ollama.
