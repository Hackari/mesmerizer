// Official colors stored as HSL (Hue and Lightness)
const categoryColors = {
  // MRT Lines
  "North South Line": { h: 9, l: 45, text: '#ffffff' },      
  "East West Line": { h: 148, l: 29, text: '#ffffff' },      
  "North East Line": { h: 294, l: 33, text: '#ffffff' },     
  "Circle Line": { h: 37, l: 52, text: '#000000' },          
  "Downtown Line": { h: 211, l: 38, text: '#ffffff' },       
  "Thomson-East Coast Line": { h: 27, l: 38, text: '#ffffff' }, 
  "Cross Island Line": { h: 84, l: 45, text: '#000000' },    
  "Jurong Region Line": { h: 187, l: 38, text: '#ffffff' },  
  "Bukit Panjang LRT": { h: 0, l: 45, text: '#ffffff' },     
  "Sengkang LRT": { h: 0, l: 45, text: '#ffffff' },          
  "Punggol LRT": { h: 0, l: 45, text: '#ffffff' },
  
  // Continents
  "Africa": { h: 35, l: 50, text: '#000000' },        
  "Asia": { h: 350, l: 45, text: '#ffffff' },         
  "Europe": { h: 220, l: 40, text: '#ffffff' },       
  "North America": { h: 275, l: 45, text: '#ffffff' },
  "South America": { h: 130, l: 35, text: '#ffffff' },
  "Oceania": { h: 195, l: 45, text: '#000000' },

  // Subdivisions
  "France": { h: 220, l: 40, text: '#ffffff' },       // Blue
  "USA": { h: 240, l: 30, text: '#ffffff' },          // Navy Blue
  "Canada": { h: 0, l: 45, text: '#ffffff' },         // Red
  "Germany": { h: 45, l: 50, text: '#000000' },       // Gold
  "Switzerland": { h: 350, l: 45, text: '#ffffff' },  // Swiss Red
  "UK": { h: 230, l: 35, text: '#ffffff' }            // Royal Blue
};

const appData = {
  "Station Names": {
    "Singapore MRT & LRT": {
      "North South Line": [
        "Jurong East", "Bukit Batok", "Bukit Gombak", "Choa Chu Kang", "Brickland", "Yew Tee", 
        "Kranji", "Sungei Kadut", "Marsiling", "Woodlands", "Admiralty", "Sembawang", "Canberra", 
        "Yishun", "Khatib", "Yio Chu Kang", "Ang Mo Kio", "Bishan", "Braddell", "Toa Payoh", 
        "Novena", "Newton", "Orchard", "Somerset", "Dhoby Ghaut", "City Hall", "Raffles Place", 
        "Marina Bay", "Marina South Pier"
      ],
      "East West Line": [
        "Pasir Ris", "Tampines", "Simei", "Tanah Merah", "Bedok", "Kembangan", "Eunos", "Paya Lebar", 
        "Aljunied", "Kallang", "Lavender", "Bugis", "City Hall", "Raffles Place", "Tanjong Pagar", 
        "Outram Park", "Tiong Bahru", "Redhill", "Queenstown", "Commonwealth", "Buona Vista", "Dover", 
        "Clementi", "Jurong East", "Chinese Garden", "Lakeside", "Boon Lay", "Pioneer", "Joo Koon", 
        "Gul Circle", "Tuas Crescent", "Tuas West Road", "Tuas Link", "Expo", "Changi Airport"
      ],
      "North East Line": [
        "HarbourFront", "Outram Park", "Chinatown", "Clarke Quay", "Dhoby Ghaut", "Little India", 
        "Farrer Park", "Boon Keng", "Potong Pasir", "Woodleigh", "Serangoon", "Kovan", "Hougang", 
        "Buangkok", "Sengkang", "Punggol", "Punggol Coast"
      ],
      "Circle Line": [
        "Dhoby Ghaut", "Bras Basah", "Esplanade", "Promenade", "Nicoll Highway", "Stadium", "Mountbatten", 
        "Dakota", "Paya Lebar", "MacPherson", "Tai Seng", "Bartley", "Serangoon", "Lorong Chuan", "Bishan", 
        "Marymount", "Caldecott", "Botanic Gardens", "Farrer Road", "Holland Village", "Buona Vista", 
        "one-north", "Kent Ridge", "Haw Par Villa", "Pasir Panjang", "Labrador Park", "Telok Blangah", 
        "HarbourFront", "Keppel", "Cantonment", "Prince Edward Road", "Bayfront", "Marina Bay"
      ],
      "Downtown Line": [
        "Bukit Panjang", "Cashew", "Hillview", "Hume", "Beauty World", "King Albert Park", "Sixth Avenue", 
        "Tan Kah Kee", "Botanic Gardens", "Stevens", "Newton", "Little India", "Rochor", "Bugis", 
        "Promenade", "Bayfront", "Downtown", "Telok Ayer", "Chinatown", "Fort Canning", "Bencoolen", 
        "Jalan Besar", "Bendemeer", "Geylang Bahru", "Mattar", "MacPherson", "Ubi", "Kaki Bukit", 
        "Bedok North", "Bedok Reservoir", "Tampines West", "Tampines", "Tampines East", "Upper Changi", 
        "Expo", "Xilin", "Sungei Bedok"
      ],
      "Thomson-East Coast Line": [
        "Woodlands North", "Woodlands", "Woodlands South", "Springleaf", "Lentor", "Mayflower", 
        "Bright Hill", "Upper Thomson", "Caldecott", "Mount Pleasant", "Stevens", "Napier", 
        "Orchard Boulevard", "Orchard", "Great World", "Havelock", "Outram Park", "Maxwell", 
        "Shenton Way", "Marina Bay", "Marina South", "Gardens by the Bay", "Founders' Memorial", 
        "Tanjong Rhu", "Katong Park", "Tanjong Katong", "Marine Parade", "Marine Terrace", "Siglap", 
        "Bayshore", "Bedok South", "Sungei Bedok"
      ],
      "Cross Island Line": [
        "Aviation Park", "Loyang", "Pasir Ris East", "Pasir Ris", "Elias", "Riviera", "Punggol", 
        "Tampines North", "Defu", "Hougang", "Serangoon North", "Tavistock", "Ang Mo Kio", 
        "Teck Ghee", "Bright Hill", "Maju", "Clementi", "West Coast", "Jurong Lake District"
      ],
      "Jurong Region Line": [
        "Choa Chu Kang", "Choa Chu Kang West", "Tengah", "Hong Kah", "Corporation", "Jurong West", 
        "Bahar Junction", "Boon Lay", "Enterprise", "Tukang", "Jurong Hill", "Jurong Pier", 
        "Tengah Plantation", "Tengah Park", "Bukit Batok West", "Toh Guan", "Jurong East", 
        "Gek Poh", "Tawas", "Nanyang Gateway", "Nanyang Crescent", "Peng Kang Hill"
      ],
      "Bukit Panjang LRT": [
        "Choa Chu Kang", "South View", "Keat Hong", "Teck Whye", "Phoenix", "Bukit Panjang", 
        "Petir", "Pending", "Bangkit", "Cove", "Fajar", "Segar", "Jelapang", "Senja"
      ],
      "Sengkang LRT": [
        "Sengkang", "Compassvale", "Rumbia", "Bakau", "Kangkar", "Ranggung", "Cheng Lim", 
        "Farmway", "Kupang", "Thanggam", "Fernvale", "Layar", "Tongkang", "Renjong"
      ],
      "Punggol LRT": [
        "Punggol", "Cove", "Meridian", "Coral Edge", "Riviera", "Kadaloor", "Oasis", "Damai", 
        "Sam Kee", "Teck Lee", "Punggol Point", "Samudera", "Nibong", "Sumang", "Soo Teck"
      ]
    }
  },
  "Geography": {
    "Countries": {
      "Africa": [
        "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cape Verde", "Cameroon", 
        "Central African Republic", "Chad", "Comoros", "Republic of the Congo", "DR Congo", 
        "Ivory Coast", "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia", 
        "Gabon", "The Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Kenya", "Lesotho", "Liberia", "Libya", 
        "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique", "Namibia", 
        "Niger", "Nigeria", "Rwanda", "São Tomé and Príncipe", "Senegal", "Seychelles", "Sierra Leone", 
        "Somalia", "South Africa", "South Sudan", "Sudan", "Togo", "Tunisia", "Uganda", 
        "Tanzania", "Zambia", "Zimbabwe"
      ],
      "Asia": [
        "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", "Brunei", "Cambodia", 
        "China", "Cyprus", "North Korea", "Georgia", "India", "Indonesia", "Iran", "Iraq", "Israel", 
        "Japan", "Jordan", "Kazakhstan", "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", "Malaysia", "Maldives", 
        "Mongolia", "Myanmar", "Nepal", "Oman", "Pakistan", "Philippines", "Qatar", "South Korea", 
        "Saudi Arabia", "Singapore", "Sri Lanka", "Syria", "Tajikistan", "Thailand", "East Timor", 
        "Turkey", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"
      ],
      "Europe": [
        "Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", 
        "Croatia", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", 
        "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", 
        "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", 
        "Moldova", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", 
        "Switzerland", "Ukraine", "United Kingdom"
      ],
      "North America": [
        "Antigua and Barbuda", "The Bahamas", "Barbados", "Belize", "Canada", "Costa Rica", "Cuba", 
        "Dominica", "Dominican Republic", "El Salvador", "Grenada", "Guatemala", "Haiti", "Honduras", 
        "Jamaica", "Mexico", "Nicaragua", "Panama", "Saint Kitts and Nevis", "Saint Lucia", 
        "Saint Vincent and the Grenadines", "Trinidad and Tobago", "United States"
      ],
      "South America": [
        "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador", "Guyana", "Paraguay", 
        "Peru", "Suriname", "Uruguay", "Venezuela"
      ],
      "Oceania": [
        "Australia", "Fiji", "Kiribati", "Marshall Islands", "Micronesia", "Nauru", "New Zealand", 
        "Palau", "Papua New Guinea", "Samoa", "Solomon Islands", "Tonga", "Tuvalu", "Vanuatu"
      ]
    },
    "Subdivisions": {
      "France": [
        "Auvergne-Rhone-Alpes", "Bourgogne-Franche-Comte", "Brittany", "Centre-Val de Loire", "Corsica", 
        "Grand Est", "Hauts-de-France", "Ile-de-France", "Normandy", "Nouvelle-Aquitaine", "Occitanie", 
        "Pays de la Loire", "Provence-Alpes-Cote d'Azur", "French Guiana", "Guadeloupe", "Martinique", 
        "Mayotte", "Reunion"
      ],
      "USA": [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", 
        "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", 
        "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", 
        "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", 
        "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", 
        "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", 
        "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
      ],
      "Canada": [
        "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", 
        "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", 
        "Northwest Territories", "Nunavut", "Yukon"
      ],
      "Germany": [
        "Baden-Württemberg", "Bavaria", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hesse", 
        "Lower Saxony", "Mecklenburg-Vorpommern", "North Rhine-Westphalia", "Rhineland-Palatinate", 
        "Saarland", "Saxony", "Saxony-Anhalt", "Schleswig-Holstein", "Thuringia"
      ],
      "Switzerland": [
        "Aargau", "Appenzell Ausserrhoden", "Appenzell Innerrhoden", "Basel-Landschaft", "Basel-Stadt", 
        "Bern", "Fribourg", "Geneva", "Glarus", "Grisons", "Jura", "Lucerne", "Neuchâtel", "Nidwalden", 
        "Obwalden", "Schaffhausen", "Schwyz", "Solothurn", "St. Gallen", "Thurgau", "Ticino", "Uri", 
        "Valais", "Vaud", "Zug", "Zurich"
      ],
      "UK": [
        "England", "Scotland", "Wales", "Northern Ireland"
      ]
    }
  }
};