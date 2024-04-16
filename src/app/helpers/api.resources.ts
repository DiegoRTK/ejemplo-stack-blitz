export const ApiResources = { 
    account: {
        base: 'account',
        login: 'account/login',
        signupAdmin: 'account/signup-admin',
        signupAgent: 'account/signup-agent'
    },
    appointmentType: {
        base: 'appointment-type',
        byId: (id: number) => `appointment-type/${id}`,
        byDate: (startingDate: Date, endingDate: Date) => `appointment-type/between-dates?startingDate=${startingDate}&endingDate=${endingDate}`
    },
    appointment: {
        base: 'appointment',
        byDate: (startingDate: Date, endingDate: Date) => `appointment/between-dates?startingDate=${startingDate.toISOString()}&endingDate=${endingDate.toISOString()}`
    },
    location: {
        base: 'location',
        byId: (locationId: number) => `location/${locationId}`
    },
    zone: {
        base: 'zone'
    },
    addres: {
        byAddress: (address: string) => `address/by-address-name?addressName=${address}`
    }
}