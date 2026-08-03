// QUERY SELECTING //
const action = document.querySelector('.')
const location = document.querySelector('.')
const collectionButtton = document.querySelector('.')
const openPackButton = document.querySelector('.')
const displayPanel = document.querySelector('.')
// DEV OBJECTS //
const kamal = {
    id: 1,
    name: 'Kamal',
    rarity: 'Common',
    language: 'Python',
    country: 'India',
    job: 'Junior Developer',
    salary: 40000,
    power: 30
}
const john = {
    id: 2,
    name: 'John',
    rarity: 'Common',
    language: 'Javascript',
    country: 'Australia',
    job: 'Junior Developer',
    salary: 60000,
    power: 32
}
const lorenzo = {
    id: 3,
    name: 'Lorenzo',
    rarity: 'Common',
    language: 'Python',
    country: 'Brazil',
    job: 'Data Analyst',
    salary: 50000,
    power: 39
}
const emma = {
    id: 4,
    name: 'Emma',
    rarity: 'Common',
    language: 'Python',
    country: "Russia",
    job: 'Data Analyst',
    salary: 60000,
    power: 36
}
const nate = {
    id: 5,
    name: 'Nate',
    rarity: 'Common',
    language: 'Javascript',
    country: 'USA',
    job: 'Junior Developer',
    salary: 72000,
    power: 43
}
const sophia = {
    id: 6,
    name: 'Sophia',
    rarity: 'Rare',
    language: 'TypeScript',
    country: 'Canada',
    job: 'Full Stack Developer',
    salary: 98000,
    power: 60
}
const miguel = {
    id: 7,
    name: 'Miguel',
    rarity: 'Rare',
    language: 'Go',
    country: 'Spain',
    job: 'Backend Engineer',
    salary: 110000,
    power: 67
}
const akira = {
    id: 8,
    name: 'Akira',
    rarity: 'Rare',
    language: 'Rust',
    country: 'Japan',
    job: 'Systems Engineer',
    salary: 125000,
    power: 72
}
const guido = {
    id: 9,
    name: 'Guido van Rossum',
    rarity: 'Epic',
    language: 'Python',
    country: 'Netherlands',
    job: 'Creator of Python',
    salary: 500000,
    power: 94
}
const linus = {
    id: 10,
    name: 'Linus Torvalds',
    rarity: 'Epic',
    language: 'C',
    country: 'Finland',
    job: 'Creator of Linux',
    salary: 3000000,
    power: 97
}
// ARRAY OF DEV CARD OBJECTS //
const devCards = [
    kamal,
    john,
    lorenzo,
    emma,
    nate,
    sophia,
    miguel,
    akira,
    guido,
    linus
]
// OPEN PACK //
