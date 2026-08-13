
import { ProcessStep, STATUS } from "../my-application.interface";
export const processSteps: ProcessStep[] = [
    {
        id: '0',
        title: 'Apply for LOA',
        description: 'Apply for LOA at a DLI',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-file',
        color: '#b580c4'
    },

    {
        id: '1',
        title: 'Medical',
        description: 'Apply for Medicals',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-heart-fill',
        color: '#E53935'
    },

    {
        id: '2',
        title: 'Police Clearance',
        description: 'Get a Police Clearance',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-shield',
        color: '#96780c'
    },

    {
        id: '3',
        title: 'Document Checklist',
        description: 'Gather these required documents',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-folder-open',
        color: '#44af16'
    },
    {
        id: '4',
        title: 'Fill and Submit Application',
        description: 'Submit the IRCC Application',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-pencil',
        color: '#555af0'
    },


    {
        id: '5',
        title: 'Biometrics',
        description: 'Schedule for biometrics',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-user',
        color: '#1E88E5'
    },
    {
        id: '6',
        title: 'Decision',
        description: 'Receive final decision',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-question-circle',
        color: '#f26a55',
    },
    {
        id: '7',
        title: 'Application Complete',
        description: 'Verify that the Application is Complete',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-check-circle',
        color: '#8ee1a1',
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
    },
    {
        id: '2',
        title: 'Documents',
        description: 'Gather required documents',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-file',
        color: '#a862cb',
    },
    {
        id: '3',
        title: 'Application Submission',
        description: 'Submit your application',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-send',
        color: '#22c55e',
    },
    {
        id: '4',
        title: 'Biometrics',
        description: 'Schedule biometrics',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-user',
        color: '#3b82f6',
    },
    {
        id: '5',
        title: 'Processing Time',
        description: 'Find processing Time',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-clock deadline-icon',
        color: '#e7d128',
    },
    {
        id: '6',
        title: 'Decision',
        description: 'Receive final decision',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-question-circle',
        color: '#eccae4',
    }, {
        id: '7',
        title: 'Application Complete',
        description: 'Verify that the Application is Complete',
        status: STATUS.NOTSTARTED,
        icon: 'pi pi-check-circle',
        color: '#8ee1a1',
    }
];
