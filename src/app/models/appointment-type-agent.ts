import { AgentProps } from "./agent";
import { AppointmentProps } from "./appointment";
import { AppointmentTypeProps } from "./appointment-type";
import { DayProps } from "./day";

export interface AppointmentTypeAgentProps {
    appointmentTypeAgentId: number;
    createdAt: Date;
    appointments: AppointmentProps[];
    days: DayProps[];
    appointmentType: AppointmentTypeProps;
    agent: AgentProps;
}