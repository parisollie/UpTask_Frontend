import { z } from 'zod'

/** Vid 544 Auth & Users */
const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    //Vid 624
    current_password: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    //Vid 548
    token: z.string()
})
//Vid 544
type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>
//Vid 551
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
//Vid 554
export type ForgotPasswordForm = Pick<Auth, 'email'>
//Vid 556
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>
//Vid 624
export type UpdateCurrentUserPasswordForm = Pick<Auth, 'current_password' | 'password' | 'password_confirmation'>
//Vid 548
export type ConfirmToken = Pick<Auth, 'token'>
//Vid 627
export type CheckPasswordForm = Pick<Auth, 'password'>

/**************************************** Users ***************************************************/

//Vid 576
export const userSchema = authSchema.pick({
    name: true,
    email: true
}).extend({
    _id: z.string()
})
export type User = z.infer<typeof userSchema>
//Vid 620
export type UserProfileForm = Pick<User, 'name' | 'email'>

/**************************************** Notes ***************************************************/

//Vid 612
const noteSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: userSchema,
    task: z.string(),
    createdAt: z.string()
})
export type Note = z.infer<typeof noteSchema>
export type NoteFormData = Pick<Note, 'content'>

/************************************************Tasks ****************************************************************/
//Vid 505 
export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed" ])
//Vid 525
export type TaskStatus = z.infer<typeof taskStatusSchema>

export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    //Vid 602
    completedBy: z.array(z.object({
        _id: z.string(),
        user: userSchema,
        status: taskStatusSchema
    })),
    notes: z.array(noteSchema.extend({
        createdBy: userSchema
    })),
    //Vid 523 
    createdAt: z.string(),
    updatedAt: z.string()
})

//Vid 638 
export const taskProjectSchema = taskSchema.pick({
    _id: true,
    name: true,
    description: true,
    status: true
})

//Vid 505
export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>
//Vid 638
export type TaskProject = z.infer<typeof taskProjectSchema>

/** ************************************************************Projects *******************************************/

export const projectSchema = z.object({
    //Vid 505 
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    //Vid 595
    manager: z.string(userSchema.pick({_id: true})),
     //Vid 638
    tasks: z.array(taskProjectSchema),
    team: z.array(z.string(userSchema.pick({_id: true})))
})

//Vid 491
export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
        //Vid 595
        manager: true
    })
)
 //Vid 637
export const editProjectSchema = projectSchema.pick({
    projectName: true,
    clientName: true,
    description: true,
})

export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description' >

/***************************************** TEAM ****************************************************/
 //Vid 586
const teamMemberSchema = userSchema.pick({
    name: true,
    email: true,
    _id: true
})
//Vid 591
export const teamMembersSchema = z.array(teamMemberSchema)
//?
export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>