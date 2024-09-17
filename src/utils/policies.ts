import { Project, TeamMember } from "../types"

//Vid 597
export const isManager = (managerId: Project['manager'], userId: TeamMember['_id']) => managerId === userId