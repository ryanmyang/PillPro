import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import WarningIcon from '@mui/icons-material/Warning';
import CancelIcon from '@mui/icons-material/Cancel';
import {
    Box,
    Collapse,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
//import data from "../data.json";
import ItemCard from "./ItemCard";
import { Verification } from './Verification';



const inputJSON = `[
    {
      "Name": "ZITHROMAX",
      "Full description": "ZITHROMAX TAB 250MG",
      "WeeklyFrequency": 14,
      "DayFrequency": 2,
      "FrequencyDescription": "Take 1 tablet 2 times a day",
      "SideEffects": "Common side effects of Zithromax can include nausea, vomiting, diarrhea, abdominal pain, and headache. More serious side effects can occur, so it is important to talk to your doctor about the risks and benefits of taking Zithromax before starting treatment."
    },
    {
      "Name": "DHASEDYL SYRUP",
      "Full description": "DHASEDYL SYRUP - 60ML SALBUTAMOL SYRUP 2MG/5ML",
      "WeeklyFrequency": 21,
      "DayFrequency": 3,
      "FrequencyDescription": "Take 10ml 3 times a day",
      "SideEffects": "Common side effects of Dhasedyl Syrup and Salbutamol Syrup can include tremors, headache, dizziness, and nausea. More serious side effects can occur, so it is important to talk to your doctor about the risks and benefits of taking these medications before starting treatment."
    },
    {
      "Name": "TELFAST D",
      "Full description": "TELFAST D - 10 tabs",
      "WeeklyFrequency": 14,
      "DayFrequency": 2,
      "FrequencyDescription": "Take 1 tablet 2 times a day FOR BLOCKED NOSE/RUNNING NOSE",
      "SideEffects": "Common side effects of Telfast D can include headache, drowsiness, and dry mouth. More serious side effects can occur, so it is important to talk to your doctor about the risks and benefits of taking Telfast D before starting treatment."
    }
  ]`;
  
  const inputTranscript = `Transcript of Doctor-Patient Interaction Regarding Allergy and Sinus Symptoms
  Patient: (Sounds unwell) Um, not too great to be honest. I'm having an awful runny nose, sneezing, and my eyes are all watery. Um, it's just really bad.
  Doctor: I'm sorry to hear that. How long have you been experiencing these symptoms?
  Patient: Uh, about a week now, but it's getting worse. Uh, I'm losing sleep because of it as well.
  Doctor: Hmm, sounds like you might be dealing with seasonal allergies. Have you noticed if anything in particular triggers these symptoms?
  Patient: Um, yeah, it tends to get worse outside, outdoors, maybe near like trees or like grass in general.
  Doctor: I see. That's a classic sign of allergic rhinitis. I'm going to prescribe you Telfast D to help alleviate those symptoms. It's an antihistamine that should provide some relief.
  Patient: Oh, uh, okay, sure. Um, but I also have like a cough, a nagging cough, that's like tightness in my chest as well.
  Doctor: Have you had any difficulty breathing along with the cough?
  Patient: Yeah, a little bit. Uh, when I'm doing like exercise, physical activity, or when there's dust or strong smells.
  Doctor: It sounds like you might also have some bronchospasm, possibly due to your allergies aggravating your airways. I'm going to prescribe you Salbutamol syrup to help relieve that tightness and make breathing easier.
  Patient: Okay, um, yeah sure, uh, and one more thing, I've been really tired lately, uh, and a very bad headache.
  Doctor: Fatigue and headaches, huh? Have you been experiencing any nasal congestion or sinus pressure?
  Patient: Uh, now that you mention it, yeah. Uh, my nose sometimes feels a little stuffy, my head feels a little heavy. Yeah.
  Doctor: It sounds like you might have developed a sinus infection on top of your allergies. I'll prescribe you Zithromax to help clear up that infection.
  Patient: Okay, sounds good. Okay. Um, sorry doctor, just one more thing. Uh, I have trouble sleeping as well because of all these symptoms and I just feel very restless at night.
  Doctor: Yeah, I understand that. Since your symptoms are interfering with your sleep, I'll also prescribe you Dhasedyl syrup. It's a mild sedative that should help you relax and get some rest.
  Patient: All right, thank you so much doctor. Yeah.
  Doctor: Of course, happy to help. I'll have them prepare Dhasedyl and Salbutamol as a mixture syrup together. Just make sure to take these medications as directed. And if you have any concerns or symptoms worsen, don't hesitate to give us a call.
  Patient: All right, thank you doctor.
  Doctor: Okay, bye.`;
  
  const inputTranscript2 = `P: Hello doctor. Um, I've been having some stomach pain and diarrhea for the past couple days. It's pretty it's quite uncomfortable.
  D: Oh, I'm sorry to hear that. That must be really annoying. Can you describe the pain a bit more? Is it constant or does it come and go?
  P: Oh, it's kind of like a cramping pain, just comes and goes, but it's pretty frequent. The diarrhea, yeah, pretty frequent too.
  D: Have you noticed anything that makes it worse? Like eating specific foods or stress or anything like that?
  P: Oh, yeah, yeah. Um, it gets worse after meals, but I'm not too sure like which foods though.
  D: Uh, okay, hmm. What about, uh, what about like fever or chills? Or do you have any recent travel or unusual meals?
  P: Uh, no. It's just like no fevers, haven't really traveled. Um, just tried like one new restaurant this weekend, but that's about it.
  D: Uh, this weekend? Okay, uh, I see. It's possible that it could be a foodborne illness, especially if it started right after you ate out this past weekend. Um, have you taken any medication to manage the pain or anything like that so far?
  P: Nah, uh, just some over-the-counter anti-acids and a lot of water, but it doesn't really help.
  D: Okay. Well, it's good you're staying hydrated, you should keep doing that. Um, but in the meantime, I'll prescribe you a medication to help manage the diarrhea and relieve the cramping. It's called Loperamide. You'll also need to keep drinking plenty of fluids to avoid dehydration.
  P: Oh, uh, how often should I take take that?
  D: You can take it after eats each loose stool, but don't exceed four doses in in a day. If you don't see any improvement in the next 48 hours or if your symptoms worsen, I want you to call me or visit the ER.
  P: Okay, okay. Um, sure. Is there anything else I should not eat or like maybe eat to help it?
  D: Yeah, yeah. So just for now, stick to bland foods like toast, rice, bananas, and applesauce. And also avoid milk or dairy products, fat, and anything too spicy or seasoned until your symptoms improve because they could make it worse.
  P: Okay, um, sure. Is there anything I should I be worried if something like happens like if it gets more serious, I guess?
  D: Uh, usually you should be okay. It'll probably be fine with simple treatment and diet adjustments, and it'll just go away. But we'll keep an eye on your symptoms. If the medication doesn't help or if you get new symptoms or anything changes and it gets worse like more pain, vomiting, or a fever, then you might want to come back for further investigations.
  P: Oh, okay. Yeah, sure. Uh thanks doc. Um thanks thanks.
  D: Yep. Make sure to rest and take the medication as directed. And call back if you have any questions or concerns.
  P: Yep, yep. Alright, thank you again.
  D: Bye-bye.
  P: Bye.`
  
  
  const instructionPrompt = `use the included prescription description to list all medicines using the following json schema: {'type': 'object','properties': {'medication': {'type': 'string'},'weeklyfrequency': {'type': 'integer'},'dayfrequency': {'type': 'integer'},'frequencydescription': {'type': 'string'},'sideeffects': {'type': 'string'}}}`
  
  const filePrompt = "Evaluate the attached file in detail and produce a transcript of the content."
  
  const instructionPrompt2 = `Transcript of Doctor Patient.txt is a transcript of an audio recording of my doctor’s visit. medications_json.txt is a list of medications I received from the pharmacist. 
  Append the JSON object 'Verification Status': {'type': 'string'} to medications_json.txt.
  
  For verification status, verify each of them with the transcript of my doctor’s visit and known information about each medication, and display it as one of five options: 
  1. "Verified"
  2. "Medication not found", if the medication could be for some medical conditions mentioned in the transcript. Include an additional JSON object “Explanation” that explains what this medication could be used for. 
  3. "Medication not found AND MIGHT BE AN ERROR", if no corresponding or relevant medical conditions were mentioned in the transcript. Include an additional JSON object “Explanation” that explains why this conclusion was reached. 
  4. “Prescribed but not dispensed” if they were correctly prescribed by the doctor for the symptoms discussed, but not received from the pharmacist. Include an additional JSON object “Explanation” that explains the intended usage of the medication.`;
  


function MedicationRow({ row, idx }) {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th">
                    <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            <Tooltip title="Toggle side effects">
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </Tooltip>
                        </IconButton>
                        {idx + 1}
                    </Grid>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.Name}
                </TableCell>
                <TableCell align="right">{row['FrequencyDescription']}</TableCell>
                <TableCell align="right">{row['DayFrequency']}</TableCell>
                <TableCell align="right">{row['Verification Status']}</TableCell>
                <TableCell><IconButton><CheckBoxIcon></CheckBoxIcon></IconButton></TableCell>
            </TableRow>
            {open && (
                <TableRow>
                    <TableCell colSpan={5}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Typography>
                                Side effects include Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Itaque esse nesciunt dignissimos hic maxime
                                reiciendis recusandae perspiciatis vero labore beatae, dolores
                                dolor, non laudantium in quaerat, voluptates ad incidunt rerum!
                            </Typography>
                        </Collapse>
                    </TableCell>
                </TableRow>
            )}
        </>
    );
}


function MedicationInfo() {
    const [data, setData] = useState([]);
    const [verificationInfo, setVerificationInfo] = useState('');

    useEffect(() => {
        const getVerification = async () => {
            try {
                const info = await Verification(instructionPrompt2, inputJSON, inputTranscript2);
                setVerificationInfo(info); // info is good
            } catch (error) {
                console.error('Error getting verification:', error);
            }
        };
        getVerification();
    }, []);

    // Function to parse the JSON text file into an array of objects
    const parseVerificationInfo = () => {
        try {
            if (!verificationInfo) return []; // Check if verificationInfo is empty
            const parsedInfo = JSON.parse(verificationInfo);
            return parsedInfo;
        } catch (error) {
            console.error('Error parsing verification info:', error);
            return [];
        }
    };

    // UseEffect to update the table data when verificationInfo changes
    useEffect(() => {
        // Parse the verificationInfo JSON text file into an array of objects
        const parsedData = parseVerificationInfo();
        setData(parsedData); // Assuming you have a setData function to set the table data
    }, [verificationInfo]);

      // Log data when it changes
    useEffect(() => {
        console.log('Data:', data);
    }, [data]);

    return (
        <ItemCard>
            <Typography variant="h2" sx={{ pb: "1rem" }}>
                Your prescription summary
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Medication</TableCell>
                            <TableCell align="right">Dosage</TableCell>
                            <TableCell align="right">Frequency</TableCell>
                            <TableCell></TableCell>
                            <TableCell align="right">Verified</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, idx) => (
                            <MedicationRow row={row} idx={idx} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ItemCard>
    );
}

export default MedicationInfo;
