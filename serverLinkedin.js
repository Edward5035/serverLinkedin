const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

app.get('/generate-leads', async (req, res) => {
  try {
    const options = {
      method: 'POST',
      url: 'https://generate-linkedin-leads.p.rapidapi.com/backend/leads/leads/',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '6c4153b579msh3b88fb9e42fb3dap1c3822jsn700d8fa34f4a',
        'X-RapidAPI-Host': 'generate-linkedin-leads.p.rapidapi.com'
      },
      data: {
        page: 1,
        job_title: [
          {
            value: 'ceo',
            label: 'CEO'
          }
        ],
        company: [],
        location: [
          {
            value: 'United States',
            label: 'United States'
          }
        ],
        not_job_title: [],
        not_location: [],
        employees: [
          {
            value: '51,100',
            label: '51-100'
          },
          {
            value: '101,200',
            label: '101-200'
          }
        ],
        industry: [],
        hiring_for: [],
        revenue: '',
        keyword: '',
        name: '',
        technology: [],
        email_status: [],
        funding: [
          {
            value: '2',
            label: 'Series A'
          }
        ]
      }
    };

    const response = await axios.request(options);
    const data = response.data;

    if (data.status === 503) {
      res.status(503).json({ error: 'Server temporarily unavailable. Please try again later.' });
      return;
    }

    const formattedLeads = data.leads.map((lead) => ({
      Name: lead.name,
      Headline: lead.headline,
      Location: lead.location,
      linkedin_url: lead.linkedin_url || '',
      company_phone: lead.company_phone || ''
    }));

    res.json(formattedLeads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
