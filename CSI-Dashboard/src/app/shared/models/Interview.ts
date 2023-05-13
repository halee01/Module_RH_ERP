import { AssQuestionInterview } from "./AssQuestionInterview";

export interface Interview{
    id ?:number;
    interviewDate ?:string;
    comment ?:string;
    globalMark ?:string;
    interviewType ?:InterviewType;
    duration ?:string;
    interviewMode ?:InterviewMode;
    assQuestionInterview?: AssQuestionInterview[];
}

export enum InterviewMode{
    REMOTE="REMOTE",
    ON_SITE="ON_SITE",
    PHONE_INTERVIEW="PHONE_INTERVIEW",
    VIDEOCONFERENCE="VIDEOCONFERENCE"
}

export enum InterviewType {
    TECHNICAL_INTERVIEW="TECHNICAL_INTERVIEW",
    HUMAN_RESOURCE_INTERVIEW="HUMAN_RESOURCE_INTERVIEW"
}
