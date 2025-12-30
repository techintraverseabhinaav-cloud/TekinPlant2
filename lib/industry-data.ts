// Industry data extracted from Excel files
export interface IndustryCourse {
  id: number
  title: string
  company: string
  location: string
  type: string
  duration: string
  students: number
  rating: number
  price: string
  image: string
  description: string
  tags: string[]
  contact: string
  website: string
}

export interface IndustryPartner {
  id: number
  name: string
  industry: string
  location: string
  description: string
  contactInfo: string
  website: string
  trainingPrograms: string[]
  employeeCount?: number
  founded?: string
}

// Enhanced industry courses data from Excel files
export const industryCourses: IndustryCourse[] = [
  {
    id: 1,
    title: "PLC Programming & Automation",
    company: "Siemens",
    location: "Mumbai, India",
    type: "Industrial Training",
    duration: "6 weeks",
    students: 245,
    rating: 4.8,
    price: "₹45,000",
    image: "https://images.unsplash.com/photo-1700427296131-0cc4c4610fc6?q=80&w=2676&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Comprehensive PLC programming training covering Siemens S7-1200 and TIA Portal software with hands-on automation projects.",
    tags: ["PLC", "Automation", "Siemens", "Industrial"],
    contact: "+91 98765 43210",
    website: "https://siemens.com"
  },
  {
    id: 2,
    title: "Electrical Panel Design",
    company: "ABB",
    location: "Bangalore, India",
    type: "Technical Training",
    duration: "4 weeks",
    students: 189,
    rating: 4.7,
    price: "₹35,000",
    image: "https://plus.unsplash.com/premium_photo-1661817214148-2d4cf768a7c3?q=80&w=1896&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Learn electrical panel design principles, component selection, and safety standards for industrial applications.",
    tags: ["Electrical", "Panel Design", "ABB", "Industrial"],
    contact: "+91 98765 43211",
    website: "https://abb.com"
  },
  {
    id: 3,
    title: "SCADA System Development",
    company: "Rockwell Automation",
    location: "Pune, India",
    type: "Software Training",
    duration: "5 weeks",
    students: 156,
    rating: 4.6,
    price: "₹40,000",
    image: "https://images.unsplash.com/photo-1667264501379-c1537934c7ab?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Master SCADA system development using FactoryTalk View Studio with real-world industrial applications.",
    tags: ["SCADA", "Rockwell", "HMI", "Automation"],
    contact: "+91 98765 43212",
    website: "https://rockwellautomation.com"
  },
  {
    id: 4,
    title: "Industrial Robotics Programming",
    company: "FANUC",
    location: "Chennai, India",
    type: "Robotics Training",
    duration: "8 weeks",
    students: 134,
    rating: 4.9,
    price: "₹55,000",
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D",
    description: "Comprehensive robotics programming training covering FANUC robots, teach pendant operation, and automation integration.",
    tags: ["Robotics", "FANUC", "Automation", "Programming"],
    contact: "+91 98765 43213",
    website: "https://fanuc.com"
  },
  {
    id: 5,
    title: "Process Control & Instrumentation",
    company: "Emerson",
    location: "Delhi, India",
    type: "Process Training",
    duration: "6 weeks",
    students: 178,
    rating: 4.5,
    price: "₹42,000",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D",
    description: "Learn process control systems, instrumentation, and DeltaV DCS programming for industrial processes.",
    tags: ["Process Control", "Instrumentation", "Emerson", "DCS"],
    contact: "+91 98765 43214",
    website: "https://emerson.com"
  },
  {
    id: 6,
    title: "HMI Development & Design",
    company: "Schneider Electric",
    location: "Hyderabad, India",
    type: "Software Training",
    duration: "4 weeks",
    students: 167,
    rating: 4.7,
    price: "₹38,000",
    image: "https://plus.unsplash.com/premium_photo-1681426687411-21986b0626a8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Master HMI development using Vijeo Designer and Wonderware InTouch for industrial automation applications.",
    tags: ["HMI", "Schneider", "Design", "Automation"],
    contact: "+91 98765 43215",
    website: "https://schneider-electric.com"
  },
  {
    id: 7,
    title: "Industrial Networking & Communication",
    company: "Cisco",
    location: "Kolkata, India",
    type: "Network Training",
    duration: "5 weeks",
    students: 145,
    rating: 4.4,
    price: "₹36,000",
    image: "https://plus.unsplash.com/premium_photo-1681399975135-252eab5fd2db?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Learn industrial networking protocols, Ethernet/IP, Profinet, and network security for automation systems.",
    tags: ["Networking", "Cisco", "Industrial", "Communication"],
    contact: "+91 98765 43216",
    website: "https://cisco.com"
  },
  {
    id: 8,
    title: "Variable Frequency Drive Programming",
    company: "Danfoss",
    location: "Ahmedabad, India",
    type: "Drive Training",
    duration: "3 weeks",
    students: 123,
    rating: 4.6,
    price: "₹28,000",
    image: "https://plus.unsplash.com/premium_photo-1764695678014-3b87d3c0a432?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Comprehensive VFD programming training covering parameter setting, commissioning, and troubleshooting.",
    tags: ["VFD", "Danfoss", "Drives", "Programming"],
    contact: "+91 98765 43217",
    website: "https://danfoss.com"
  },
  {
    id: 9,
    title: "Safety Systems & SIL Training",
    company: "Honeywell",
    location: "Mumbai, India",
    type: "Safety Training",
    duration: "4 weeks",
    students: 98,
    rating: 4.8,
    price: "₹45,000",
    image: "https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?q=80&w=2286&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Learn safety instrumented systems, SIL calculations, and Safety Manager programming for critical applications.",
    tags: ["Safety", "Honeywell", "SIL", "Critical Systems"],
    contact: "+91 98765 43218",
    website: "https://honeywell.com"
  },
  {
    id: 10,
    title: "Industrial IoT & Industry 4.0",
    company: "Bosch",
    location: "Bangalore, India",
    type: "IoT Training",
    duration: "6 weeks",
    students: 167,
    rating: 4.7,
    price: "₹48,000",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Master Industrial IoT concepts, data analytics, and Industry 4.0 implementation strategies.",
    tags: ["IoT", "Industry 4.0", "Bosch", "Analytics"],
    contact: "+91 98765 43219",
    website: "https://bosch.com"
  },
  {
    id: 11,
    title: "Motor Control & Protection",
    company: "Siemens",
    location: "Pune, India",
    type: "Motor Training",
    duration: "4 weeks",
    students: 134,
    rating: 4.5,
    price: "₹32,000",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Learn motor control systems, protection relays, and soft starter programming for industrial applications.",
    tags: ["Motor Control", "Siemens", "Protection", "Industrial"],
    contact: "+91 98765 43220",
    website: "https://siemens.com"
  },
  {
    id: 12,
    title: "DCS Programming & Configuration",
    company: "Yokogawa",
    location: "Chennai, India",
    type: "DCS Training",
    duration: "7 weeks",
    students: 89,
    rating: 4.9,
    price: "₹52,000",
    image: "https://plus.unsplash.com/premium_photo-1661962646119-0c9d2a604a63?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Master DCS programming using CENTUM VP with advanced control strategies and system integration.",
    tags: ["DCS", "Yokogawa", "CENTUM", "Control Systems"],
    contact: "+91 98765 43221",
    website: "https://yokogawa.com"
  },
  {
    id: 13,
    title: "Industrial Cybersecurity",
    company: "Fortinet",
    location: "Delhi, India",
    type: "Security Training",
    duration: "5 weeks",
    students: 112,
    rating: 4.6,
    price: "₹40,000",
    image: "https://plus.unsplash.com/premium_photo-1661964187664-e26f70e1a224?q=80&w=2687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Learn industrial cybersecurity, network protection, and security best practices for automation systems.",
    tags: ["Cybersecurity", "Fortinet", "Security", "Industrial"],
    contact: "+91 98765 43222",
    website: "https://fortinet.com"
  },
  {
    id: 14,
    title: "Batch Process Control",
    company: "Emerson",
    location: "Mumbai, India",
    type: "Process Training",
    duration: "6 weeks",
    students: 78,
    rating: 4.7,
    price: "₹46,000",
    image: "https://plus.unsplash.com/premium_photo-1661963515041-661b417c0b45?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Master batch process control using DeltaV Batch with recipe management and batch execution strategies.",
    tags: ["Batch Control", "Emerson", "Process", "DeltaV"],
    contact: "+91 98765 43223",
    website: "https://emerson.com"
  },
  {
    id: 15,
    title: "Industrial Data Analytics",
    company: "SAP",
    location: "Bangalore, India",
    type: "Analytics Training",
    duration: "8 weeks",
    students: 145,
    rating: 4.8,
    price: "₹58,000",
    image: "https://plus.unsplash.com/premium_photo-1683121696175-d05600fefb85?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Learn industrial data analytics, predictive maintenance, and performance optimization using SAP solutions.",
    tags: ["Analytics", "SAP", "Predictive", "Data Science"],
    contact: "+91 98765 43224",
    website: "https://sap.com"
  },
  {
    id: 16,
    title: "Motion Control Systems",
    company: "Rockwell Automation",
    location: "Pune, India",
    type: "Motion Training",
    duration: "5 weeks",
    students: 67,
    rating: 4.9,
    price: "₹44,000",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Master motion control systems using Kinetix drives and servo programming for precision applications.",
    tags: ["Motion Control", "Rockwell", "Servo", "Precision"],
    contact: "+91 98765 43225",
    website: "https://rockwellautomation.com"
  },
  {
    id: 17,
    title: "Industrial Wireless Communication",
    company: "Honeywell",
    location: "Chennai, India",
    type: "Wireless Training",
    duration: "4 weeks",
    students: 89,
    rating: 4.5,
    price: "₹35,000",
    image: "https://plus.unsplash.com/premium_photo-1681400019731-5d7cc4cafb9d?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Learn industrial wireless communication protocols, mesh networks, and wireless sensor networks.",
    tags: ["Wireless", "Honeywell", "Communication", "Sensors"],
    contact: "+91 98765 43226",
    website: "https://honeywell.com"
  },
  {
    id: 18,
    title: "Advanced Process Control",
    company: "ABB",
    location: "Mumbai, India",
    type: "Advanced Training",
    duration: "8 weeks",
    students: 56,
    rating: 4.9,
    price: "₹65,000",
    image: "https://plus.unsplash.com/premium_photo-1733317290375-d39da9fcc8e3?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Master advanced process control techniques, model predictive control, and optimization strategies.",
    tags: ["Advanced Control", "ABB", "MPC", "Optimization"],
    contact: "+91 98765 43227",
    website: "https://abb.com"
  },
  {
    id: 19,
    title: "Industrial Cloud Solutions",
    company: "Microsoft",
    location: "Bangalore, India",
    type: "Cloud Training",
    duration: "6 weeks",
    students: 123,
    rating: 4.6,
    price: "₹42,000",
    image: "https://plus.unsplash.com/premium_photo-1764705723226-8ec5a8d8fda9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Learn Azure IoT Hub, industrial cloud platforms, and digital twin implementation for Industry 4.0.",
    tags: ["Cloud", "Microsoft", "Azure", "Digital Twin"],
    contact: "+91 98765 43228",
    website: "https://microsoft.com"
  },
  {
    id: 20,
    title: "Industrial Machine Learning",
    company: "Google Cloud",
    location: "Delhi, India",
    type: "AI Training",
    duration: "10 weeks",
    students: 78,
    rating: 4.8,
    price: "₹72,000",
    image: "https://plus.unsplash.com/premium_photo-1764695811910-d1b958dab303?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Master industrial machine learning, predictive analytics, and AI implementation for automation systems.",
    tags: ["Machine Learning", "Google", "AI", "Predictive"],
    contact: "+91 98765 43229",
    website: "https://cloud.google.com"
  },
  // Additional courses from Excel data
  {
    id: 21,
    title: "Power Systems & Distribution",
    company: "L&T",
    location: "Mumbai, India",
    type: "Power Training",
    duration: "7 weeks",
    students: 156,
    rating: 4.7,
    price: "₹50,000",
    image: "https://images.unsplash.com/photo-1543946602-a0fce8117697?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Comprehensive power systems training covering distribution networks, protection systems, and grid management.",
    tags: ["Power Systems", "L&T", "Distribution", "Grid"],
    contact: "+91 98765 43230",
    website: "https://larsentoubro.com"
  },
  {
    id: 22,
    title: "Renewable Energy Systems",
    company: "Suzlon",
    location: "Pune, India",
    type: "Renewable Training",
    duration: "6 weeks",
    students: 134,
    rating: 4.6,
    price: "₹45,000",
    image: "https://plus.unsplash.com/premium_photo-1681399960857-f3bf93e87a03?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Learn renewable energy systems, solar power, wind energy, and sustainable energy management.",
    tags: ["Renewable Energy", "Suzlon", "Solar", "Wind"],
    contact: "+91 98765 43231",
    website: "https://suzlon.com"
  },
  {
    id: 23,
    title: "Smart Grid Technologies",
    company: "BHEL",
    location: "Delhi, India",
    type: "Grid Training",
    duration: "8 weeks",
    students: 98,
    rating: 4.8,
    price: "₹55,000",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Master smart grid technologies, IoT integration, and advanced metering infrastructure.",
    tags: ["Smart Grid", "BHEL", "IoT", "Metering"],
    contact: "+91 98765 43232",
    website: "https://bhel.com"
  },
  {
    id: 24,
    title: "Energy Management Systems",
    company: "Schneider Electric",
    location: "Bangalore, India",
    type: "Energy Training",
    duration: "5 weeks",
    students: 167,
    rating: 4.7,
    price: "₹42,000",
    image: "https://plus.unsplash.com/premium_photo-1752302839380-411d4411b0b1?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Learn energy management systems, efficiency optimization, and sustainability practices.",
    tags: ["Energy Management", "Schneider", "Efficiency", "Sustainability"],
    contact: "+91 98765 43233",
    website: "https://schneider-electric.com"
  },
  {
    id: 25,
    title: "Industrial Automation & Control",
    company: "TATA Motors",
    location: "Mumbai, India",
    type: "Automation Training",
    duration: "9 weeks",
    students: 145,
    rating: 4.9,
    price: "₹60,000",
    image: "https://plus.unsplash.com/premium_photo-1733342554594-102b8e2d0623?q=80&w=3462&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Comprehensive industrial automation training covering manufacturing processes and control systems.",
    tags: ["Automation", "TATA Motors", "Manufacturing", "Control"],
    contact: "+91 98765 43234",
    website: "https://tatamotors.com"
  }
]

export const industryPartners: IndustryPartner[] = [
  {
    id: 1,
    name: "Siemens",
    industry: "Industrial Automation",
    location: "Mumbai, India",
    description: "Global leader in industrial automation, digitalization, and electrification solutions.",
    contactInfo: "+91 22 3967 0000",
    website: "https://siemens.com",
    trainingPrograms: ["PLC Programming", "SCADA Systems", "Industrial IoT"],
    employeeCount: 50000,
    founded: "1847"
  },
  {
    id: 2,
    name: "ABB",
    industry: "Power & Automation",
    location: "Bangalore, India",
    description: "Pioneering technology leader in electrification, robotics, and industrial automation.",
    contactInfo: "+91 80 2294 9100",
    website: "https://abb.com",
    trainingPrograms: ["Electrical Systems", "Robotics", "Process Control"],
    employeeCount: 45000,
    founded: "1883"
  },
  {
    id: 3,
    name: "Rockwell Automation",
    industry: "Industrial Automation",
    location: "Pune, India",
    description: "World's largest company dedicated to industrial automation and information solutions.",
    contactInfo: "+91 20 6601 1000",
    website: "https://rockwellautomation.com",
    trainingPrograms: ["PLC Systems", "Motion Control", "Safety Systems"],
    employeeCount: 25000,
    founded: "1903"
  },
  {
    id: 4,
    name: "Emerson",
    industry: "Process Management",
    location: "Delhi, India",
    description: "Global technology and engineering company providing innovative solutions for customers.",
    contactInfo: "+91 11 4666 6000",
    website: "https://emerson.com",
    trainingPrograms: ["Process Control", "DCS Systems", "Instrumentation"],
    employeeCount: 35000,
    founded: "1890"
  },
  {
    id: 5,
    name: "Schneider Electric",
    industry: "Energy Management",
    location: "Hyderabad, India",
    description: "Global specialist in energy management and automation solutions.",
    contactInfo: "+91 40 6677 7000",
    website: "https://schneider-electric.com",
    trainingPrograms: ["Energy Management", "HMI Development", "Industrial Software"],
    employeeCount: 40000,
    founded: "1836"
  },
  {
    id: 6,
    name: "Honeywell",
    industry: "Industrial Solutions",
    location: "Chennai, India",
    description: "Fortune 100 company that invents and manufactures technologies to address critical challenges.",
    contactInfo: "+91 44 6656 1000",
    website: "https://honeywell.com",
    trainingPrograms: ["Safety Systems", "Process Control", "Industrial Software"],
    employeeCount: 30000,
    founded: "1906"
  },
  {
    id: 7,
    name: "Yokogawa",
    industry: "Industrial Automation",
    location: "Mumbai, India",
    description: "Leading provider of industrial automation and test and measurement solutions.",
    contactInfo: "+91 22 2493 4000",
    website: "https://yokogawa.com",
    trainingPrograms: ["DCS Systems", "Process Control", "Analytics"],
    employeeCount: 15000,
    founded: "1915"
  },
  {
    id: 8,
    name: "FANUC",
    industry: "Robotics & Automation",
    location: "Bangalore, India",
    description: "World leader in factory automation, robotics, and CNC systems.",
    contactInfo: "+91 80 2294 9200",
    website: "https://fanuc.com",
    trainingPrograms: ["Industrial Robotics", "CNC Programming", "Automation"],
    employeeCount: 8000,
    founded: "1956"
  },
  {
    id: 9,
    name: "Bosch",
    industry: "Technology & Services",
    location: "Pune, India",
    description: "Leading global supplier of technology and services in mobility, industrial technology, and consumer goods.",
    contactInfo: "+91 20 6601 2000",
    website: "https://bosch.com",
    trainingPrograms: ["IoT Solutions", "Industry 4.0", "Connected Manufacturing"],
    employeeCount: 35000,
    founded: "1886"
  },
  {
    id: 10,
    name: "Danfoss",
    industry: "Power Solutions",
    location: "Ahmedabad, India",
    description: "Global leader in engineering solutions for climate and energy efficiency.",
    contactInfo: "+91 79 6601 3000",
    website: "https://danfoss.com",
    trainingPrograms: ["Drive Systems", "Climate Solutions", "Power Electronics"],
    employeeCount: 12000,
    founded: "1933"
  },
  {
    id: 11,
    name: "Cisco",
    industry: "Networking & Security",
    location: "Kolkata, India",
    description: "Worldwide leader in IT and networking that helps companies seize the opportunities of tomorrow.",
    contactInfo: "+91 33 6601 4000",
    website: "https://cisco.com",
    trainingPrograms: ["Industrial Networking", "Cybersecurity", "IoT Connectivity"],
    employeeCount: 25000,
    founded: "1984"
  },
  {
    id: 12,
    name: "SAP",
    industry: "Enterprise Software",
    location: "Bangalore, India",
    description: "Global leader in enterprise application software, helping companies run better.",
    contactInfo: "+91 80 2294 9300",
    website: "https://sap.com",
    trainingPrograms: ["Enterprise Software", "Data Analytics", "Digital Transformation"],
    employeeCount: 20000,
    founded: "1972"
  },
  {
    id: 13,
    name: "Microsoft",
    industry: "Technology & Cloud",
    location: "Hyderabad, India",
    description: "Leading global technology company providing cloud computing, software, and hardware solutions.",
    contactInfo: "+91 40 6677 8000",
    website: "https://microsoft.com",
    trainingPrograms: ["Cloud Solutions", "Azure IoT", "Digital Twins"],
    employeeCount: 45000,
    founded: "1975"
  },
  {
    id: 14,
    name: "Google Cloud",
    industry: "Cloud Computing",
    location: "Mumbai, India",
    description: "Leading cloud platform providing infrastructure, platform, and software services.",
    contactInfo: "+91 22 2493 5000",
    website: "https://cloud.google.com",
    trainingPrograms: ["Cloud Computing", "Machine Learning", "Data Analytics"],
    employeeCount: 15000,
    founded: "2008"
  },
  {
    id: 15,
    name: "Fortinet",
    industry: "Cybersecurity",
    location: "Delhi, India",
    description: "Global leader in broad, integrated, and automated cybersecurity solutions.",
    contactInfo: "+91 11 4666 7000",
    website: "https://fortinet.com",
    trainingPrograms: ["Cybersecurity", "Network Security", "Industrial Security"],
    employeeCount: 8000,
    founded: "2000"
  },
  {
    id: 16,
    name: "TATA Consultancy Services",
    industry: "IT Services",
    location: "Mumbai, India",
    description: "Leading global IT services, consulting, and business solutions organization.",
    contactInfo: "+91 22 3967 1000",
    website: "https://tcs.com",
    trainingPrograms: ["Digital Transformation", "IT Services", "Consulting"],
    employeeCount: 500000,
    founded: "1968"
  },
  {
    id: 17,
    name: "Infosys",
    industry: "IT Services",
    location: "Bangalore, India",
    description: "Global leader in next-generation digital services and consulting.",
    contactInfo: "+91 80 2294 9400",
    website: "https://infosys.com",
    trainingPrograms: ["Digital Services", "Consulting", "Technology Solutions"],
    employeeCount: 350000,
    founded: "1981"
  },
  {
    id: 18,
    name: "Wipro",
    industry: "IT Services",
    location: "Bangalore, India",
    description: "Leading global information technology, consulting, and business process services company.",
    contactInfo: "+91 80 2294 9500",
    website: "https://wipro.com",
    trainingPrograms: ["IT Services", "Consulting", "Digital Solutions"],
    employeeCount: 250000,
    founded: "1945"
  },
  // Additional partners from Excel data
  {
    id: 19,
    name: "L&T",
    industry: "Engineering & Construction",
    location: "Mumbai, India",
    description: "Leading Indian multinational engaged in technology, engineering, construction, manufacturing and financial services.",
    contactInfo: "+91 22 6752 5656",
    website: "https://larsentoubro.com",
    trainingPrograms: ["Power Systems", "Construction", "Engineering"],
    employeeCount: 150000,
    founded: "1938"
  },
  {
    id: 20,
    name: "Suzlon",
    industry: "Renewable Energy",
    location: "Pune, India",
    description: "Global renewable energy solutions provider specializing in wind energy and sustainable power generation.",
    contactInfo: "+91 20 6702 5000",
    website: "https://suzlon.com",
    trainingPrograms: ["Wind Energy", "Renewable Systems", "Sustainability"],
    employeeCount: 8000,
    founded: "1995"
  },
  {
    id: 21,
    name: "BHEL",
    industry: "Power Generation",
    location: "Delhi, India",
    description: "India's largest engineering and manufacturing company in the energy-related infrastructure sector.",
    contactInfo: "+91 11 2340 3000",
    website: "https://bhel.com",
    trainingPrograms: ["Power Generation", "Smart Grid", "Energy Systems"],
    employeeCount: 45000,
    founded: "1964"
  },
  {
    id: 22,
    name: "TATA Motors",
    industry: "Automotive",
    location: "Mumbai, India",
    description: "Leading global automobile manufacturer with a portfolio of cars, utility vehicles, trucks, buses and defense vehicles.",
    contactInfo: "+91 22 2498 1444",
    website: "https://tatamotors.com",
    trainingPrograms: ["Automotive Engineering", "Manufacturing", "Quality Control"],
    employeeCount: 80000,
    founded: "1945"
  },
  {
    id: 23,
    name: "Mahindra & Mahindra",
    industry: "Automotive",
    location: "Mumbai, India",
    description: "Leading Indian multinational automotive manufacturing corporation with diversified business interests.",
    contactInfo: "+91 22 2490 1441",
    website: "https://mahindra.com",
    trainingPrograms: ["Automotive Technology", "Manufacturing", "Innovation"],
    employeeCount: 75000,
    founded: "1945"
  },
  {
    id: 24,
    name: "Maruti Suzuki",
    industry: "Automotive",
    location: "Delhi, India",
    description: "India's largest passenger vehicle manufacturer, a subsidiary of Japanese car and motorcycle manufacturer Suzuki.",
    contactInfo: "+91 11 4678 1000",
    website: "https://marutisuzuki.com",
    trainingPrograms: ["Automotive Engineering", "Production Systems", "Quality Management"],
    employeeCount: 40000,
    founded: "1981"
  },
  {
    id: 25,
    name: "Ashok Leyland",
    industry: "Automotive",
    location: "Chennai, India",
    description: "Indian multinational automotive manufacturer, the second largest commercial vehicle manufacturer in India.",
    contactInfo: "+91 44 4599 9999",
    website: "https://ashokleyland.com",
    trainingPrograms: ["Commercial Vehicles", "Manufacturing", "Engineering"],
    employeeCount: 15000,
    founded: "1948"
  }
]

// Industry statistics
export const industryStats = {
  totalPartners: industryPartners.length,
  totalCourses: industryCourses.length,
  totalStudents: industryCourses.reduce((sum, course) => sum + course.students, 0),
  averageRating: (industryCourses.reduce((sum, course) => sum + course.rating, 0) / industryCourses.length).toFixed(1),
  industries: [...new Set(industryPartners.map(partner => partner.industry))],
  locations: [...new Set(industryPartners.map(partner => partner.location.split(',')[0]))]
}

// Industry insights and trends
export const industryInsights = {
  topIndustries: [
    { name: "Industrial Automation", count: 8 },
    { name: "Automotive", count: 5 },
    { name: "Power & Energy", count: 4 },
    { name: "IT Services", count: 4 },
    { name: "Technology & Cloud", count: 3 },
    { name: "Engineering & Construction", count: 2 }
  ],
  popularLocations: [
    { name: "Mumbai", count: 10 },
    { name: "Bangalore", count: 6 },
    { name: "Delhi", count: 4 },
    { name: "Pune", count: 4 },
    { name: "Chennai", count: 3 },
    { name: "Hyderabad", count: 2 },
    { name: "Kolkata", count: 1 },
    { name: "Ahmedabad", count: 1 }
  ],
  averageCoursePrice: "₹45,000",
  averageDuration: "6 weeks",
  successRate: "96%",
  placementRate: "89%",
  totalRevenue: "₹12.5 Crores",
  marketGrowth: "18% YoY",
  totalEmployees: industryPartners.reduce((sum, partner) => sum + (partner.employeeCount || 0), 0),
  averageCompanyAge: Math.round(industryPartners.reduce((sum, partner) => {
    const founded = parseInt(partner.founded || "2000")
    return sum + (2024 - founded)
  }, 0) / industryPartners.length)
}
