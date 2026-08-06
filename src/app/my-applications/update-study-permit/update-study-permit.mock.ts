export interface Step {
  disabled: boolean;
  id?: string;
  title: string;
  description?: string;
  completed: boolean;
  icon?: string;
  color?: string;
}

export interface DocumentItem {
  id: number;
  label: string;
  completed: boolean;
}

/* ==========================
  Messages
========================== */
export const messages: Record<number, string> = {
  0: 'LOA Progress Updated Successfully!',
  1: 'Medical Application Progress Updated Successfully!',
  2: 'Police Clearence Updated Successfully!',
  3: 'Document Progress Updated Successfully!',
  4: 'IRCC Application Progress Updated Successfully!',
  5: 'Biometric Application Progress Updated Successfully!',
  6: 'Final Decesion Updated Successfully!'
};
/* ==========================
   STEP 0 — LOA STEPS
========================== */
export const STEPS: Step[] = [
  {
    disabled: false,
    id: '1',
    title: 'Choose a Program',
    description: `Have you selected a study program from a Designated Learning Institution (DLI)?
      <p>
      <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list.html"
      target="_blank">Learning Institutions List (DLI)</a></p>`,
    completed: false,
    icon: 'pi pi-book',
    color: '#1E88E5',
  },
  {
    disabled: true,
    id: '2',
    title: 'Apply to the Designated Learning Institution (DLI) in Canada',
    description: 'Have you applied to the course of your choice on the DLI website in Canada?',
    completed: false,
    icon: 'pi pi-send',
    color: '#D2579B',
  },
  {
    disabled: true,
    id: '3',
    title: 'Receive Letter of Acceptance',
    description: 'Have you received the Letter of Acceptance from the DLI?',
    completed: false,
    icon: 'pi pi-envelope',
    color: '#DAAA0F',
  },
  {
    disabled: true,
    id: '4',
    title: 'Check if you Require a Provincial Attestation Letter',
    description: `Have you received the Provincial Attestation Letter (PAL) <b>if required</b> for the selected program?`,
    completed: false,
    icon: 'pi pi-file-check',
    color: '#43A047',
  },
];

/* ==========================
   STEP 1 — MEDICAL
========================== */
export const MEDICAL_STEPS: Step[] = [
  {
    disabled: false,
    id: '1',
    title: 'Medical Examination Appointment',
    description: `Have you taken the appointment for medical examination?`,
    completed: false,
    icon: 'pi pi-heart-fill',
    color: '#1E88E5',
  },
  {
    disabled: true,
    id: '2',
    title: 'Medical Examination Done',
    description: 'Have you completed your medical examination at the corresponding hospital as per the schedule?',
    completed: false,
    icon: 'pi pi-heart-fill',
    color: '#44af16',
  }
];

/* ==========================
   STEP 2 — PCC
========================== */
export const PCC_STEPS: Step[] = [
  {
    disabled: false,
    id: '1',
    title: 'Police Clearence (PCC)',
    description: `Have you applied for Police Clearence?`,
    completed: false,
    icon: 'pi pi-shield',
    color: '#1E88E5',
  },
  {
    disabled: true,
    id: '2',
    title: 'Police Clearence Done',
    description: 'Have you completed PCC?',
    completed: false,
    icon: 'pi pi-shield',
    color: '#44af16',
  }
];

/* ==========================
   STEP 4 — SUBMISSION
========================== */
export const SUBMISSION_STEPS: Step[] = [
  {
    disabled: false,
    id: '1',
    title: 'Filled the Application',
    description: `Have you filled the application online on the IRCC Poratl?`,
    completed: false,
    icon: 'pi pi-pencil',
    color: '#1E88E5',
  },
  {
    disabled: true,
    id: '2',
    title: 'Upload Documents',
    description: 'Have you uploaded the documents?',
    completed: false,
    icon: 'pi pi-folder-open',
    color: '#44af16',
  },
  {
    disabled: true,
    id: '3',
    title: 'Submit Application',
    description: 'Have you submitted the application?',
    completed: false,
    icon: 'pi pi-envelope',
    color: '#b83699',
  }
];

/* ==========================
   STEP 5 — BIOMETRICS
========================== */
export const BIOMETRICS_STEPS: Step[] = [
  {
    disabled: false,
    id: '1',
    title: 'Biometrics Appointment',
    description: `Have you taken the appointment for Biometrics?`,
    completed: false,
    icon: 'pi pi-user',
    color: '#1E88E5',
  },
  {
    disabled: true,
    id: '2',
    title: 'Biometrics Complete',
    description: 'Have you completed your biometric verification at the corresponding site as per the schedule?',
    completed: false,
    icon: 'pi pi-user',
    color: '#44af16',
  }
];

/* ==========================
   STEP 6 — DECISION
========================== */
export const DECISION_STEPS: Step[] = [
  {
    disabled: false,
    id: '1',
    title: 'Application Accepted',
    description: `Is you application accepted?`,
    completed: false,
    icon: 'pi pi-check',
    color: '#29db8e',
  },
  {
    disabled: false,
    id: '2',
    title: 'Application Rejected',
    description: 'Is your application Rejected?',
    completed: false,
    icon: 'pi pi-times',
    color: '#e45b29',
  },
  {
    disabled: false,
    id: '3',
    title: 'Application Pending',
    description: 'Is your application Pending?',
    completed: false,
    icon: 'pi pi-question-circle',
    color: '#d6d31d',
  }
];

/* ==========================
   STEP 3 — DOCUMENT CHECKLIST
========================== */
export const DOCUMENTS: DocumentItem[] = [
  { id: 1, label: 'Letter of Acceptance (LOA)', completed: false },
  { id: 2, label: 'Passport Photocopy', completed: false },
  { id: 3, label: 'PAL/TAL (if Required)', completed: false },
  { id: 4, label: 'Proof of Financial Support', completed: false },
  { id: 5, label: '2 Digital Photos', completed: false },
  { id: 6, label: 'Supporting Documents', completed: false },
  { id: 7, label: 'Proof of Fee Payment', completed: false },
  { id: 8, label: 'Marriage Certificate (if applicable)', completed: false },
  { id: 9, label: 'Medical Certificate', completed: false }
];
