const corsOptions = {
  origin: ['http://localhost:5173', 'https://calangobank.onrender.com' ],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

export default corsOptions;