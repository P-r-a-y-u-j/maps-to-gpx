const pathname = '/dir/trivandrum/delhi/data=!4m2!4m1!3e0';
const regex = /\/dir\/([^/]+)\/([^/]+)/;
const match = pathname.match(regex);

console.log('Pathname:', pathname);
console.log('Regex:', regex);
console.log('Match:', match);

if (match) {
    console.log('Origin:', decodeURIComponent(match[1]));
    console.log('Destination:', decodeURIComponent(match[2]));
}
