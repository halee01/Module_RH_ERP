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
    ON_SITE="ON_SITE"
}

export enum InterviewType {
    BEHAVIORAL_INTERVIEW="BEHAVIORAL_INTERVIEW",
    TECHNICAL_INTERVIEW="TECHNICAL_INTERVIEW",
    CASE_STUDY_INTERVIEW="CASE_STUDY_INTERVIEW",
    HUMAN_RESOURCE_INTERVIEW="HUMAN_RESOURCE_INTERVIEW",
    ONLINE_TEST="ONLINE_TEST",
    ON_SITE_TEST=" ON_SITE_TEST",
    PANEL_INTERVIEW="PANEL_INTERVIEW",
    GROUP_INTERVIEW="GROUP_INTERVIEW",
    PHONE_INTERVIEW="PHONE_INTERVIEW",
    IN_PERSON="IN_PERSON"
}
