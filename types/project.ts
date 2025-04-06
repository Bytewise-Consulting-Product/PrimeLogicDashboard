// export type TPROJECTSTATUS = "PENDING" | "CANCELLED" | "ONGOING" | "COMPLETED"
// export type TKPIRANK = "BRONZE" | "SILVER" | "GOLD" | "PLATINIUM" | "DIAMOND" | "CROWN" | "ACE" | "CONQUERER"
// export type TDIFFICULTYLEVEL = "EASY" | "MEDIUM" | "HARD"
// export type TPROJECTTYPE = "INHOUSE" | "OUTSOURCE"

// export type TPROJECT = {
//   id: string
//   title: string
//   detail: string
//   projectType: TPROJECTTYPE
//   niche: string
//   bounty: number
//   deadline: string
//   projectStatus: TPROJECTSTATUS
//   progressPercentage: number
//   isDeadlineNeedToBeExtend: boolean
//   difficultyLevel: TDIFFICULTYLEVEL
//   clientId?: string
//   team: string[]
//   status: "completed" | "in-progress" | "at-risk" | "delayed"
//   progress: number
//   clientWhoPostedThisProjectForeignId?: string
//   selectedFreelancersForThisProject: string[]
//   interestedFreelancerWhoWantToWorkOnThisProject: string[]
//   commentByClientAfterProjectCompletion?: string
//   starsByClientAfterProjectCompletion?: string
// }



// Type definitions
export type TPROJECTSTATUS = "PENDING" | "CANCELLED" | "ONGOING" | "COMPLETED"
export type TKPIRANK = "BRONZE" | "SILVER" | "GOLD" | "PLATINIUM" | "DIAMOND" | "CROWN" | "ACE" | "CONQUERER"
export type TDIFFICULTYLEVEL = "EASY" | "MEDIUM" | "HARD"
export type TPROJECTTYPE = "INHOUSE" | "OUTSOURCE"
export type TUPDATE_PROJECT = {
  title: string
  detail: string
  projectType: TPROJECTTYPE
  niche: string
  bounty: number
  deadline: string
  projectStatus: TPROJECTSTATUS
  progressPercentage: number
  isDeadlineNeedToBeExtend: boolean
  difficultyLevel: TDIFFICULTYLEVEL
}

export type TPROJECT = TUPDATE_PROJECT & {
  clientWhoPostedThisProjectForeignId?: string
  selectedFreelancers: string[]
  interestedFreelancers: string[]
  commentByClientAfterProjectCompletion?: string
  starsByClientAfterProjectCompletion?: string
}

