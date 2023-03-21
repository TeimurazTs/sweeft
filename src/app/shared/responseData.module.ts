import { Pagination } from "./pagination.module"
import { User } from "./user.module"

export interface ResponseData {
    pagination: Pagination
    list: User[]
}