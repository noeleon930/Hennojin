import codecs
import pprint

fileSQL = codecs.open('tags.sql', 'w', 'utf-8')
fileSQL.write('SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";' + '\r')
fileSQL.write('INSERT INTO `tags` (`type`, `name`, `id`) VALUES' + '\r')

contents = codecs.open('contents.txt', 'r', 'utf-8').readlines()
artists = codecs.open('artists.txt', 'r', 'utf-8').readlines()
parodies = codecs.open('parodies.txt', 'r', 'utf-8').readlines()

for item in contents:
	fileSQL.write('("contents", "' + item.replace("\r", "") + '", null),' + '\r')

for item in artists:
	fileSQL.write('("artists", "' + item.replace("\r", "") + '", null),' + '\r')

for item in parodies:
	fileSQL.write('("parodies", "' + item.replace("\r", "") + '", null),' + '\r')

fileSQL.write('(null, null, null);' + '\r')
fileSQL.close()
