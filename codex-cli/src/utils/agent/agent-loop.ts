/**
 * @deprecated Use the OpenAIAgentLoop class from openai-agent-loop.ts instead.
 * This file is kept for backward compatibility and will be removed in a future version.
 */

import type { ApplyPatchCommand, ApprovalPolicy } from "../../approvals.js";
import type { AppConfig } from "../config.js";
import type { ResponseInputItem, ResponseItem } from "openai/resources/responses/responses.mjs";
import type { ReviewDecision } from "./review.js";

import { BaseAgentLoop } from "./base-agent-loop.js";
import { createAgentLoop as createAgentLoopFactory } from "../model-utils.js";

/**
 * @deprecated Use CommandConfirmation from base-agent-loop.ts instead.
 */
export type CommandConfirmation = {
  review: ReviewDecision;
  applyPatch?: ApplyPatchCommand | undefined;
  customDenyMessage?: string;
};

/**
 * @deprecated Use AgentLoopParams from base-agent-loop.ts instead.
 */
export type AgentLoopParams = {
  model: string;
  config?: AppConfig;
  instructions?: string;
  approvalPolicy: ApprovalPolicy;
  onItem: (item: ResponseItem) => void;
  onLoading: (loading: boolean) => void;
  getCommandConfirmation: (
    command: Array<string>,
    applyPatch: ApplyPatchCommand | undefined,
  ) => Promise<CommandConfirmation>;
  onLastResponseId: (lastResponseId: string) => void;
};

/**
 * @deprecated Use the createAgentLoop function from model-utils.ts instead.
 */
export function createAgentLoop(params: AgentLoopParams): BaseAgentLoop {
  return createAgentLoopFactory(params);
}

/**
 * @deprecated Use the OpenAIAgentLoop class from openai-agent-loop.ts instead.
 */
export class AgentLoop implements BaseAgentLoop {
  public sessionId: string;

  constructor(params: AgentLoopParams) {
    // Create a real agent using the factory
    const realAgent = createAgentLoopFactory(params);
    this.sessionId = realAgent.sessionId;
    
    // Delegate all methods to the real agent
    this.run = realAgent.run.bind(realAgent);
    this.cancel = realAgent.cancel.bind(realAgent);
    this.terminate = realAgent.terminate.bind(realAgent);
    this.clearConversationHistory = realAgent.clearConversationHistory.bind(realAgent);
  }

  public run(input: Array<ResponseInputItem>, previousResponseId?: string): Promise<void> {
    throw new Error("Method should be overridden by delegation");
  }

  public cancel(): void {
    throw new Error("Method should be overridden by delegation");
  }

  public terminate(): void {
    throw new Error("Method should be overridden by delegation");
  }

  public clearConversationHistory(): void {
    throw new Error("Method should be overridden by delegation");
  }
}
