from flask import Flask, jsonify, request

import requests, json
import datetime

app = Flask(__name__)

@app.route('/upcoming_odds_info', methods = ['GET'])
def main():

    url = "https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/"

    querystring = {"regions":"us", "oddsFormat": "american", "bookmakers": ["draftkings"], "apiKey": "91c553bdf4ea2ce831d77831c7cb55a5"}


    #response = requests.get(url,  params=querystring).json()
    response = None
    with open("odds_data.json", "r") as readfile:
        response = json.load(readfile)

    #json_formatted_str = json.dumps(response, indent=2)

    #with open("odds_data.json", "w") as outfile:
    #    outfile.write(json_formatted_str)

    matchups = []
    for matchup in response:
        matchup_dict = {}
        odds_info = matchup["bookmakers"][0]["markets"][0]["outcomes"]
        matchup_dict["Start Time"] = correct_time_to_EST(matchup["commence_time"])
        matchup_dict["Home Team"] = odds_info[0]["name"]
        matchup_dict["Home Team Odds"] = odds_info[0]["price"]
        matchup_dict["Away Team"] = odds_info[1]["name"]
        matchup_dict["Away Team Odds"] = odds_info[1]["price"]
        matchups.append(matchup_dict)
    return jsonify({"data": matchups})

def correct_time_to_EST(time_string):
    #index 11 is the first digit of the hour, index 12 is the second digit of the hour
    hour_as_int = int(time_string[11:13])
    minutes_as_int = int(time_string[14:16])
    #first four indices contain year
    year_as_int = int(time_string[0:4])
    month_as_int = int(time_string[5:7])
    day_as_int = int(time_string[8:10])
    #If this is true, this means GMT date is one day ahead of EST date, set date back by one day and advance hour by 19 hours
    if hour_as_int < 5:
        hour_as_int += 19
        #If first of month in GMT, need to go to end of month in EST
        if day_as_int == 1:
            #If January 1 in GMT, that's December 31 in EST, so set back year, month, and day
            if month_as_int == 1:
                year_as_int -= 1
                month_as_int = 12
                day_as_int = 31
            elif month_as_int == 11 or month_as_int == 9 or month_as_int == 8 or month_as_int == 6 or month_as_int == 3 or month_as_int == 2:
                month_as_int -= 1
                day_as_int = 31
            else:
                month_as_int -= 1
                day_as_int = 30
        #If not the first of the month, just need to go back one day
        else:
            day_as_int -= 1

    #Otherwise just set the hour back 5 hours becasue date in GMT = date in EST
    else:
        hour_as_int -= 5
    
    pm_string = "AM"
    if hour_as_int >= 12:
        pm_string = "PM"
        hour_as_int -= 12
    return f"{str(year_as_int)}-{str(month_as_int)}-{str(day_as_int)}T{str(hour_as_int)}:{minutes_as_int:02d}{pm_string}"





if __name__ == "__main__":
    app.run(debug=True)