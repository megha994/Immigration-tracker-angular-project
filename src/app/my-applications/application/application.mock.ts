
import { ProcessStep, STATUS } from "../my-application.interface";
export const processSteps: ProcessStep[] = [
    {
        id: '0',
        title: 'Apply for LOA',
        description: 'Apply for LOA at a DLI',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-file',
        color: '#b580c4',
        disabled: false
    },

    {
        id: '1',
        title: 'Medical',
        description: 'Apply for Medicals',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-heart-fill',
        color: '#E53935',
        disabled: false
    },

    {
        id: '2',
        title: 'Police Clearance',
        description: 'Get a Police Clearance',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-shield',
        color: '#96780c',
        disabled: true
    },

    {
        id: '3',
        title: 'Document Checklist',
        description: 'Gather these required documents',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-folder-open',
        color: '#44af16',
        disabled: true
    },
    {
        id: '4',
        title: 'Fill and Submit Application',
        description: 'Submit the IRCC Application',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-pencil',
        color: '#555af0',
        disabled: true
    },


    {
        id: '5',
        title: 'Biometrics',
        description: 'Schedule for biometrics',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-user',
        color: '#1E88E5',
        disabled: true
    },
    {
        id: '6',
        title: 'Decision',
        description: 'Receive final decision',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-question-circle',
        color: '#f26a55',
        disabled: true
    },
    {
        id: '7',
        title: 'Application Complete',
        description: 'Verify that the Application is Complete',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-check-circle',
        color: '#8ee1a1',
        disabled: true
    }
];

export const progressSteps: ProcessStep[] = [
    {
        id: '1',
        title: 'Eligibility Check',
        description: 'Verify eligibility requirements',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-check-circle',
        color: '#95ead9',
        disabled: false
    },
    {
        id: '2',
        title: 'Documents',
        description: 'Gather required documents',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-file',
        color: '#a862cb',
        disabled: false
    },
    {
        id: '3',
        title: 'Application Submission',
        description: 'Submit your application',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-send',
        color: '#22c55e',
        disabled: false
    },
    {
        id: '4',
        title: 'Biometrics',
        description: 'Schedule biometrics',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-user',
        color: '#3b82f6',
        disabled: false
    },
    {
        id: '5',
        title: 'Processing Time',
        description: 'Find processing Time',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-clock deadline-icon',
        color: '#e7d128',
        disabled: false
    },
    {
        id: '6',
        title: 'Decision',
        description: 'Receive final decision',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-question-circle',
        color: '#eccae4',
        disabled: false
    }
];

export const applicationProgress = {
    type: "Study Permit",
    userid: "megha671994@gmail.com",
    daysLeft:"5",
    applicationProgress: [{
        id: '0',
        title: 'Apply for LOA',
        description: 'Apply for LOA at a DLI',
        status: STATUS.COMPLETED,
        icon: 'pi pi-file',
        color: '#b580c4',
        disabled: false
    },
    {
        id: '1',
        title: 'Medical',
        description: 'Apply for Medicals',
        status: STATUS.INPROGRESS,
        icon: 'pi pi-heart-fill',
        color: '#E53935',
        disabled: false
    },

    {
        id: '2',
        title: 'Police Clearance',
        description: 'Get a Police Clearance',
        status: STATUS.INPROGRESS,
        icon: 'pi pi-shield',
        color: '#96780c',
        disabled: true
    },

    {
        id: '3',
        title: 'Document Checklist',
        description: 'Gather these required documents',
        status: STATUS.COMPLETED,
        icon: 'pi pi-folder-open',
        color: '#44af16',
        disabled: true
    },
    {
        id: '4',
        title: 'Fill and Submit Application',
        description: 'Submit the IRCC Application',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-pencil',
        color: '#555af0',
        disabled: true
    },
    {
        id: '5',
        title: 'Biometrics',
        description: 'Schedule for biometrics',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-user',
        color: '#1E88E5',
        disabled: true
    },
    {
        id: '6',
        title: 'Decision',
        description: 'Receive final decision',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-question-circle',
        color: '#f26a55',
        disabled: true
    },
    {
        id: '7',
        title: 'Application Complete',
        description: 'Verify that the Application is Complete',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-check-circle',
        color: '#8ee1a1',
        disabled: true
    }]
}

