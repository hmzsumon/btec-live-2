import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Layout from '../layouts/Layout';

export default function SimpleAccordion() {
	return (
		<Layout>
			<div className='px-2 py-10 bg-slate-800'>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel1a-content'
						id='panel1a-header'
					>
						<Typography>What Is Payunx Coin??</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							Payunx is an open source wallet to wallet digital currency,
							favored by blockchain worldwide.
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel2a-content'
						id='panel2a-header'
					>
						<Typography>Who Control The Payunx Network?</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							Nobody owns the Payunx coin network much like no one owns the
							technology behind email. payunx coin is controlled by all payunx
							coin users around the world
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel3a-content'
						id='panel3a-header'
					>
						<Typography>Payment Freedom?</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							Any Time Payunx Coin Balance Transfer possible.
						</Typography>
					</AccordionDetails>
				</Accordion>

				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel3a-content'
						id='panel3a-header'
					>
						<Typography>When Will The Exchange Come?</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>Exchange Start in April</Typography>
					</AccordionDetails>
				</Accordion>

				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel3a-content'
						id='panel3a-header'
					>
						<Typography>
							How Do Referral Comission Transfer To Main Balance?
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							If You Make 100 Referral Than Your Token Balance Will Be Converted
							To Your Real Balance
						</Typography>
					</AccordionDetails>
				</Accordion>

				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel3a-content'
						id='panel3a-header'
					>
						<Typography>How Long Will I Get Referral Commission?</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							You Will Receive Referral Comission Till February 20
						</Typography>
					</AccordionDetails>
				</Accordion>

				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel3a-content'
						id='panel3a-header'
					>
						<Typography>How Much Supply Payunx Coin? ?</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>Total Supply 1,00,000,000,00PXC</Typography>
					</AccordionDetails>
				</Accordion>
			</div>
		</Layout>
	);
}
