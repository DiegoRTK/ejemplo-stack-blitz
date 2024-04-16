import { AppointmentTypeAgentProps } from "./appointment-type-agent";
import { DayProps } from "./day";
import { LocationProps } from "./location";

export interface AppointmentProps {
    appointmentId: number;
    clientName: string;
    clientPhoneNumber: string;
    clientAddress: string;
    code: string;
    startingHour: string;
    cancelled: boolean;
    cancelledBy: null;
    dayNumber: number;
    createdAt: Date;
    appointmentTypeAgent: AppointmentTypeAgentProps;
    location: LocationProps;
    day: DayProps;
    [x: string]: any;
}