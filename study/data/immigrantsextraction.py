#!/usr/bin/python
# coding: utf-8
import json

text = "Immigrants From Banned Nations: Educated, Mostly Citizens and Found in Every State Immigration from the seven countries targeted by President Trump has been going on for decades but has never been much more than a trickle. Altogether, immigrants and visitors from those countries are about 2 percent of all foreign-born people living in the United States.  Most of these people are naturalized citizens and are not directly affected by the ban. But the status of tens of thousands of those with permanent resident status is not as clear, as administration officials have said they may be subject to greater scrutiny if they travel abroad.  And visa holders may not be able to return to the United States if they go out of the country.  Here’s a look at who these people are and how they have settled in the United States.  Many Have College Degrees  As a whole, residents from the seven predominantly Muslim countries, especially Iranians and the small group of Libyans, are better educated than the rest of America. People from Syria and Sudan also tend to be better educated than the national average.  Some Have Prospered  Residents from Iran, Syria and Libya, who are more likely than the population as a whole to be managers, engineers and teachers, make close to or above the median income for the entire American population.  Somalis and Sudanese are overrepresented in blue-collar jobs in manufacturing and transportation, and make less. The median income of Somalis is less than half the United States average.  Iraqis, Somalis and Sudanese Are More Recent Arrivals  The pattern is roughly commensurate with how long immigrant communities have been in the United States, with nearly half of Iranians moving there before 1990. Nearly two-thirds of Iraqis, Somalis and Sudanese have arrived since 2000.  Most Are Now Citizens  Most United States residents from these seven countries have become citizens, a rate higher than that of the foreign-born population in the country as a whole. A small number, about 10,000, have served in the American military.  They Have Settled in Every State  Southern California has absorbed the largest number of residents from these countries, followed by the Detroit area – both places with substantial Arab and Muslim communities. But some of the groups, especially the large contingent of Somalis, are widely dispersed.  Hundreds of thousands of Iranians live in suburbs north of Los Angeles, areas that have also drawn many Iraqis, Syrians and Yemenis.  Thousands of Iraqis and Yemenis have settled in the Detroit area. A large contingent of Syrians lives in Brooklyn, but they have also settled in Burbank and Glendale, Calif., and the Detroit area.  Somalis and Sudanese have settled in a very different pattern, and tend to be more isolated. Minneapolis has the most Somali-born residents, but Columbus, Ohio, and Seattle also have significant communities. Des Moines has a large number of Sudanese residents, who are also numerous in Texas and Virginia.  Three Were Involved in Attacks  Of the more than 856,000 immigrants, visa holders and green-card holders originally from the countries affected by the ban, just three are known to have carried out violent attacks inside the United States since Sept.11, 2001, according to David Sterman, an analyst at the New America think tank who maintains a database of terrorist attacks in the United States.  One of the attackers was born in Iran and was a naturalized citizen when he drove his S.U.V. into a crowd at the University of North Carolina at Chapel Hill in 2006.  The two others were born in Somalia and entered the United States as refugees. One of them stabbed at least 10 people in a mall in Minnesota. The other rammed a car into pedestrians on a sidewalk and stabbed students at the campus of Ohio State University. Both attacks occurred in 2016.  Since Sept. 11, 2001, a vast majority of the perpetrators of terrorist attacks came from countries not listed in the ban, and many were born in the United States."

attrs = ["salary","education","move","citizen"]
countryname = ["Iran","Iraq","Libya","Somalia","Sudan","Syria","Yemen"]
sentences = text.split(". ")
sentenceInfo = {}
for index, sentence in enumerate(sentences):
    key = sentence.strip()+"."
    sentenceInfo[key] = {}
    for attrindex, attr in enumerate(attrs):
        sentenceInfo[key][attr] = []

data = sentenceInfo
with open('immigrantscontent.json', 'w') as outfile:
    json.dump(data, outfile)










