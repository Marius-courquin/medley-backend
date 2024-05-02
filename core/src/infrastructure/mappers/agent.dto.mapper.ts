import {AgentDto} from "@infrastructure/dtos/agent.dto";
import {Agent} from "@domain/entities/agent.entity";

export class AgentDtoMapper {

    static fromModel(agent: Agent): AgentDto {
        return new AgentDto(
            agent.id
        )
    }

    static toModel(agentDto: AgentDto): Agent {
        return new Agent(
            agentDto.id
        )
    }
}