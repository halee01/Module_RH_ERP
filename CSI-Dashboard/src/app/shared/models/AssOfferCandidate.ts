export interface AssOfferCandidate{
    id ?:number;
    employeeNum ?:number;
    offerNum ?:number;
    applicationDate ?:number;
    expeienceLevel ?: ExperienceLevel
    
}

export enum ExperienceLevel{
    JUNIOR="Junior",
    MID_LEVEL="Confirmé",
    SENIOR="Senior",
    EXPERT="Expert"
}