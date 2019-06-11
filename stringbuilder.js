var StringBuilder = require('stringbuilder')
  , fs = require('fs');
 
// Make an markdown file of the beatles
var data = {
    band: "The Beatles"
  , formed: new Date(1960)
  , discography: [
      { name: 'Sentimental Journey', created: new Date(1970), price: (Math.random()*10)+1 }
    , { name: 'Beaucoups of Blues', created: new Date(1970), price: (Math.random()*10)+1 }
    , { name: 'Ringo', created: new Date(1973), price: (Math.random()*10)+1 }
    , { name: 'Goodnight Vienna', created: new Date(1974), price: (Math.random()*10)+1 }
    , { name: 'Ringo\'s Rotogravure', created: new Date(1976), price: (Math.random()*10)+1 }
    , { name: 'Ringo the 4th', created: new Date(1977), price: (Math.random()*10)+1 }
  ]
};
 
var main = new StringBuilder()
  , discography = new StringBuilder();
 
// extend de String object
StringBuilder.extend('string');
 
var filename = './{0}.md'.format(data.band);
 
var stream = fs.createWriteStream( filename );
 
var namesRegex = /(John|Paul|George|Ringo)\s(Lennon|McCartney|Harrison|Starr)/g
 
main
  .appendLine('{0}', data.band)
  .appendLine()
  .append('{0} were an English rock band formed in Liverpool in {1:YYYY}.', data.band, data.formed)
  .append('They became the most commercially successful and critically ')
  .append('acclaimed act in the rock music era. The group\'s best-known ')
  .appendLine('lineup consisted of John Lennon, Paul McCartney, George Harrison, and Ringo Starr.')
  .replace(namesRegex, '[$1 $2](http://en.wikipedia.org/wiki/$1_$2)') // replace
  .appendLine()
  .appendLine('### Discography')
  .appendLine()
  .append(discography) // append an StringBuilder
  .appendLine()
  .appendLine('### Influences')  // then write more text
  .appendLine()
  .append('Their earliest influences include ')
  .appendLine('Elvis Presley, Carl Perkins, Little Richard and Chuck Berry ...')
  .appendLine()
  .appendLine('### Genres')  
  .appendLine('')
  .append('Originating as a skiffle group, the Beatles quickly embraced 1950s ')
  .append('rock and roll, and their repertoire ultimately expanded to include')
  .appendLine('a broad variety of pop music ...')
  .insert('## ', 0) // Insert text
  ;
 

var filename = './{0}.md'.format(data.band);
var stream = fs.createWriteStream( filename, 'utf-8' );
 
main.pipe(stream);
main.flush();