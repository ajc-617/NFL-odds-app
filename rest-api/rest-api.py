from flask import Flask, Response
import json

app = Flask(__name__)

#Need this because when returning data to browser, need to bypass CORS policy
@app.route("/upcoming_odds_info", methods = ['OPTIONS'])
def home():
    print("in options upcoming odds info")
    resp = Response("Access-Control-Allow-Origin header set to '*'")
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

@app.route('/upcoming_odds_info', methods = ['GET'])
def main():

    print("in get upcoming odds info")
    url = "https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/"

    querystring = {"regions":"us", "oddsFormat": "american", "bookmakers": ["draftkings"], "apiKey": "91c553bdf4ea2ce831d77831c7cb55a5", "markets": "spreads,h2h,totals"}

    # This line isn't needed because we're not getting games directly from the API, will instead use previous games as demonstration
    # response = requests.get(url,  params=querystring).json()

    response = None
    #Read samples games into python dictionary
    with open("sample_odds_data_1.json", "r") as readfile:
         response = json.load(readfile)

    # json_formatted_str = json.dumps(response, indent=2)

    # with open("odds_data.json", "w") as outfile:
    #     outfile.write(json_formatted_str)

    matchups = []
    #Looping through all of the games to add to matchups
    for matchup in response:
        #If either h2h or spread or totals don't exist, skip game, it's probably over or in garbage time
        if matchup["bookmakers"] == [] or len(matchup["bookmakers"][0]["markets"]) != 3:
            continue
        matchup_dict = {}
        markets = matchup["bookmakers"][0]["markets"]
        odds_info = markets[0]["outcomes"]
        spread = markets[1]["outcomes"]
        total = markets[2]["outcomes"][0]["point"]
        #API gives times in weird format so correct it so something more readable for the user
        matchup_dict["Start Time"] = correct_time_to_EST(matchup["commence_time"])
        matchup_dict["Home Team"] = odds_info[1]["name"]
        matchup_dict["Home Team Odds"] = odds_info[1]["price"]
        matchup_dict["Away Team"] = odds_info[0]["name"]
        matchup_dict["Away Team Odds"] = odds_info[0]["price"]
        matchup_dict["Spread"] = min(spread[0]["point"], spread[1]["point"])
        matchup_dict["Total"] = total
        matchups.append(matchup_dict)
    resp = Response("Access-Control-Allow-Origin header set to '*'")
    resp.set_data(json.dumps(matchups))
    resp.headers['Access-Control-Allow-Origin'] = '*'

    return resp

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
            #Previous month has 30 days, yes I'm saying February has 30 days because I don't want to deal with leap years, but there's never NFL games in late February anyways
            elif month_as_int == 11 or month_as_int == 9 or month_as_int == 6 or month_as_int == 4 or month_as_int == 2:
                month_as_int -= 1
                day_as_int = 30
            #Otherwise previous month has 31 days
            else:
                month_as_int -= 1
                day_as_int = 31
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