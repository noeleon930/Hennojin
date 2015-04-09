import codecs
import pprint

lines = codecs.open('manga.yml', 'r', 'utf-8').readlines()

artists = set()
contents = set()
parodies = set()

for line in lines:
    if(line.find("  contents: ") != -1):
    	line = line.replace("  contents: ", "").replace("\"", "").replace("\r\n", "")
    	contentsInThisLine = line.split(",")
    	for content in contentsInThisLine:
    		if(content.startswith(" ")):
    			content = content[1:]
    		if(content.endswith(" ")):
    			content = content[:-1]
    		if(content == ""):
    			pass
    		else:
    			contents.add(content.lower())
    elif(line.find("  artist: ") != -1):
    	line = line.replace("  artist: ", "").replace("\"", "").replace("\r\n", "")
    	artistsInThisLine = line.split(",")
    	for artist in artistsInThisLine:
    		if(artist.startswith(" ")):
    			artist = artist[1:]
    		if(artist.endswith(" ")):
    			artist = artist[:-1]
    		if(artist == ""):
    			pass
    		else:
    			artists.add(artist.lower())
    elif(line.find("  parody: ") != -1):
    	line = line.replace("  parody: ", "").replace("\"", "").replace("\r\n", "")
    	parodiesInThisLine = line.split(",")
    	for parody in parodiesInThisLine:
    		if(parody.startswith(" ")):
    			parody = parody[1:]
    		if(parody.endswith(" ")):
    			parody = parody[:-1]
    		if(parody == ""):
    			pass
    		else:
    			parodies.add(parody.lower())

fileContents = codecs.open('contents.txt', 'w', 'utf-8')
fileArtists = codecs.open('artists.txt', 'w', 'utf-8')
fileParodies = codecs.open('parodies.txt', 'w', 'utf-8')

contentsList = list(contents)
contentsList.sort()

artistsList = list(artists)
artistsList.sort()

parodiesList = list(parodies)
parodiesList.sort()

for content in contentsList:
	fileContents.write(content + "\r")

for artist in artistsList:
	fileArtists.write(artist + "\r")

for parody in parodiesList:
	fileParodies.write(parody + "\r")

fileContents.close()
fileArtists.close()
fileParodies.close()
