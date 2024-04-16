import { AppointmentTypeAgentProps } from "./appointment-type-agent";

export interface AppointmentTypeProps {
    typeName: string;
    duration: string;
    appointmentTypeId?: number;
    createdAt?: Date;
    appointmentTypeAgents?: Array<AppointmentTypeAgentProps>;
}