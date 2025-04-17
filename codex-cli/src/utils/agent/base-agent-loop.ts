/**
 * Base interface for all agent loop implementations.
 * This defines the common API that all model providers must implement.
 */

import type { ResponseInputItem, ResponseItem } from "openai/resources/responses/responses.mjs";
import type { ApplyPatchCommand, ApprovalPolicy } from "../../approvals.js";
import type { AppConfig } from "../config.js";

/**
 * Represents the result of a command confirmation.
 */
export type CommandConfirmation = {
  review: ReviewDecision;
  applyPatch?: ApplyPatchCommand | undefined;
  customDenyMessage?: string;
};

// Import ReviewDecision from the review module
import type { ReviewDecision } from "./review.js";

/**
 * Parameters for creating an agent loop instance.
 */
export interface AgentLoopParams {
  /** The model to use for this agent loop. */
  model: string;
  
  /** Optional configuration object. */
  config?: AppConfig;
  
  /** Optional system instructions to provide to the model. */
  instructions?: string;
  
  /** The approval policy to use for command execution. */
  approvalPolicy: ApprovalPolicy;
  
  /** Callback for emitting response items. */
  onItem: (item: ResponseItem) => void;
  
  /** Callback for indicating loading state. */
  onLoading: (loading: boolean) => void;
  
  /** Callback for requesting command confirmation from the user. */
  getCommandConfirmation: (
    command: Array<string>,
    applyPatch: ApplyPatchCommand | undefined,
  ) => Promise<CommandConfirmation>;
  
  /** Callback for notifying about the last response ID. */
  onLastResponseId: (lastResponseId: string) => void;
}

/**
 * Base interface for all agent loop implementations.
 * This defines the common API that all model providers must implement.
 */
export interface BaseAgentLoop {
  /**
   * The unique session ID for this agent loop instance.
   */
  sessionId: string;

  /**
   * Run the agent with the given input.
   * 
   * @param input The input items to process
   * @param previousResponseId Optional ID of the previous response
   */
  run(input: Array<ResponseInputItem>, previousResponseId?: string): Promise<void>;

  /**
   * Cancel the current operation.
   * This should abort any in-progress requests and tool calls.
   */
  cancel(): void;

  /**
   * Terminate the agent loop.
   * After calling this method, the instance becomes unusable.
   */
  terminate(): void;

  /**
   * Clear the conversation history.
   * This is used when the user issues the `/clear` command.
   */
  clearConversationHistory(): void;
}
