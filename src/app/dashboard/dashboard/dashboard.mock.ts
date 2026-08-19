import { STATUS, dashboardSteps } from "./dashboard.intrface";
export const dashboardStep: dashboardSteps[] = [
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