import {Injectable} from "@nestjs/common";
import {AgentRepository} from "@domain/repositories/agent.repository";
import {AgentDto} from "@infrastructure/dtos/agent.dto";
import {Agent} from "@domain/entities/agent.entity";
import {AgentDtoMapper} from "@infrastructure/mappers/agent.dto.mapper";

@Injectable()
export class AgentService {

    constructor(
        private readonly repository: AgentRepository
    ) {}

    async create(agentDto: AgentDto): Promise<AgentDto> {
        let agent: Agent = await this.repository.findById(agentDto.id);
        if (agent) {
            return AgentDtoMapper.fromModel(agent);
        }
        agent = AgentDtoMapper.toModel(agentDto);
        return AgentDtoMapper.fromModel(await this.repository.save(agent))
    }

    async getById(agentId: string): Promise<AgentDto> {
        let agent: Agent = await this.repository.findById(agentId);
        return AgentDtoMapper.fromModel(agent);
    }
}