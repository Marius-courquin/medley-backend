import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AgentService} from "@domain/services/agent.service";
import {AgentRepository} from "@domain/repositories/agent.repository";
import {Agent} from "@domain/entities/agent.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Agent])
    ],
    providers: [
        AgentService,
        AgentRepository
    ],
    exports: [
        AgentService,
        AgentRepository
    ]
})
export class AgentModule {}