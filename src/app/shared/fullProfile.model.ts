export interface fullProfile {
    address: {
        zipCode: string,
        city: string,
        streetAdress: string,
        country: string
    },
    email: string,
    id: string
    imageUrl: string,
    ip: string,
    jobArea: string,
    jobDescriptor: string,
    jobType: string,
    lastName: string,
    name: string,
    prefix: string,
    title: string,
    company: {
        name: string,
        suffix: string
    }
}