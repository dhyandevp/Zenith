/**
 * Zenith Artifact Seeder
 * 
 * Seeds the Firestore "artifacts" collection with all pre-classified items
 * from the "already fetched" text files — books, games, links, movies,
 * music, shopping, and tools.
 * 
 * Usage:  node scripts/seed-artifacts.mjs
 * 
 * Requires: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
 *           in .env.local (already present).
 */

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ── Load .env.local manually (no dotenv dependency) ──────────────────
function loadEnv() {
  const envPath = resolve(ROOT, ".env.local");
  const content = readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let value = trimmed.slice(eqIdx + 1).trim();
    // Strip surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}
loadEnv();

// ── Firebase Admin init ──────────────────────────────────────────────
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey,
  }),
});
const db = getFirestore();

// ── Artifact data ────────────────────────────────────────────────────
// Each item: { title, description, type, source, tags, url?, imageUrl?, size? }

const BOOKS = [
  {
    title: "1984",
    description: "A classic dystopian novel by George Orwell exploring totalitarian government, surveillance, and thought control.",
    type: "BOOK",
    source: "George Orwell",
    tags: ["dystopian", "classic", "fiction", "political"],
    url: "https://en.wikipedia.org/wiki/Nineteen_Eighty-Four",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/1984first.jpg",
  },
  {
    title: "Dune",
    description: "A groundbreaking science fiction novel by Frank Herbert set on the desert planet Arrakis, exploring politics, religion, and ecology.",
    type: "BOOK",
    source: "Frank Herbert",
    tags: ["science-fiction", "classic", "epic", "desert"],
    url: "https://en.wikipedia.org/wiki/Dune_(novel)",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/d/de/Dune-Frank_Herbert_%281965%29_First_edition.jpg",
  },
  {
    title: "Foundation",
    description: "A legendary science fiction book series by Isaac Asimov about the fall and rise of galactic civilization guided by psychohistory.",
    type: "BOOK",
    source: "Isaac Asimov",
    tags: ["science-fiction", "classic", "series", "space"],
    url: "https://en.wikipedia.org/wiki/Foundation_(Asimov_novel)",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/2/25/Foundation_gnome.jpg",
  },
  {
    title: "Little Women",
    description: "A classic coming-of-age novel by Louisa May Alcott following the lives of the four March sisters during the American Civil War.",
    type: "BOOK",
    source: "Louisa May Alcott",
    tags: ["classic", "coming-of-age", "fiction", "family"],
    url: "https://en.wikipedia.org/wiki/Little_Women",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Houghton_AC85.A%E2%84%9397.L.1868_pt.1_-_Little_Women%2C_title.jpg/440px-Houghton_AC85.A%E2%84%9397.L.1868_pt.1_-_Little_Women%2C_title.jpg",
  },
  {
    title: "The Monkey's Paw",
    description: "A classic supernatural short story by W. W. Jacobs about a magical monkey's paw that grants three wishes with terrible consequences.",
    type: "BOOK",
    source: "W. W. Jacobs",
    tags: ["horror", "short-story", "supernatural", "classic"],
    url: "https://en.wikipedia.org/wiki/The_Monkey%27s_Paw",
  },
  {
    title: "Steve Jobs",
    description: "The authorized biography of Apple co-founder Steve Jobs by Walter Isaacson, revealing the brilliant and abrasive personality behind Apple.",
    type: "BOOK",
    source: "Walter Isaacson",
    tags: ["biography", "technology", "apple", "non-fiction"],
    url: "https://en.wikipedia.org/wiki/Steve_Jobs_(book)",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/e/e4/Steve_Jobs_by_Walter_Isaacson.jpg",
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    description: "A comedic science fiction series by Douglas Adams following Arthur Dent's absurd interstellar adventures after Earth's destruction.",
    type: "BOOK",
    source: "Douglas Adams",
    tags: ["comedy", "science-fiction", "classic", "adventure"],
    url: "https://en.wikipedia.org/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/b/bd/H2G2_UK_front_cover.jpg",
  },
  {
    title: "To Kill a Mockingbird",
    description: "A Pulitzer Prize-winning novel by Harper Lee tackling racial injustice in the American South through the eyes of young Scout Finch.",
    type: "BOOK",
    source: "Harper Lee",
    tags: ["classic", "fiction", "justice", "american-literature"],
    url: "https://en.wikipedia.org/wiki/To_Kill_a_Mockingbird",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
  },
];

const GAMES = [
  {
    title: "Apex Legends",
    description: "A free-to-play hero shooter battle royale game by Electronic Arts set in the Titanfall universe with unique character abilities.",
    type: "GAME",
    source: "Respawn Entertainment",
    tags: ["battle-royale", "fps", "free-to-play", "multiplayer"],
    url: "https://www.ea.com/games/apex-legends",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/d/db/Apex_legends_cover.jpg",
  },
  {
    title: "Baldur's Gate 3",
    description: "A highly acclaimed role-playing video game based on Dungeons & Dragons, featuring deep narrative choices and turn-based combat.",
    type: "GAME",
    source: "Larian Studios",
    tags: ["rpg", "d&d", "turn-based", "story-driven"],
    url: "https://baldursgate3.game/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/1/12/Baldur%27s_Gate_3_cover_art.jpg",
    size: "lg",
  },
  {
    title: "Counter-Strike 2",
    description: "Counter-Strike 2, the latest iteration of the legendary tactical first-person shooter franchise by Valve with upgraded Source 2 engine.",
    type: "GAME",
    source: "Valve",
    tags: ["fps", "tactical", "esports", "competitive"],
    url: "https://www.counter-strike.net/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/f/f2/CS2_Cover_Art.jpg",
  },
  {
    title: "Cyberpunk 2077",
    description: "An open-world action-RPG set in a dystopian future megacity, featuring deep customization and a gripping narrative.",
    type: "GAME",
    source: "CD Projekt Red",
    tags: ["rpg", "open-world", "cyberpunk", "action"],
    url: "https://www.cyberpunk.net/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg",
  },
  {
    title: "Dota 2",
    description: "A multiplayer online battle arena (MOBA) game by Valve where two teams of five compete to destroy each other's Ancient.",
    type: "GAME",
    source: "Valve",
    tags: ["moba", "esports", "multiplayer", "strategy"],
    url: "https://www.dota2.com/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/0/05/Dota_2_cover.jpg",
  },
  {
    title: "Elden Ring",
    description: "An acclaimed action RPG developed by FromSoftware in collaboration with George R.R. Martin, set in the vast Lands Between.",
    type: "GAME",
    source: "FromSoftware",
    tags: ["action-rpg", "open-world", "souls-like", "fantasy"],
    url: "https://en.bandainamcoent.eu/elden-ring/elden-ring",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg",
    size: "lg",
  },
  {
    title: "GTA V",
    description: "Grand Theft Auto V, an iconic open-world action-adventure game by Rockstar set in the fictional state of San Andreas.",
    type: "GAME",
    source: "Rockstar Games",
    tags: ["open-world", "action", "adventure", "crime"],
    url: "https://www.rockstargames.com/gta-v",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png",
  },
  {
    title: "League of Legends",
    description: "A highly popular MOBA game by Riot Games where champions battle across strategic lanes to destroy the enemy Nexus.",
    type: "GAME",
    source: "Riot Games",
    tags: ["moba", "esports", "multiplayer", "competitive"],
    url: "https://www.leagueoflegends.com/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/LOL_Logo_Rendered_Hi-Res.png/280px-LOL_Logo_Rendered_Hi-Res.png",
  },
  {
    title: "Minecraft",
    description: "A sandbox video game where players build and explore blocky, procedurally-generated 3D worlds with infinite creative possibilities.",
    type: "GAME",
    source: "Mojang Studios",
    tags: ["sandbox", "survival", "creative", "multiplayer"],
    url: "https://www.minecraft.net/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png",
  },
  {
    title: "Red Dead Redemption 2",
    description: "An epic open-world Western action-adventure game by Rockstar, following outlaw Arthur Morgan in a stunningly detailed frontier.",
    type: "GAME",
    source: "Rockstar Games",
    tags: ["open-world", "western", "action", "story-driven"],
    url: "https://www.rockstargames.com/reddeadredemption2/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg",
    size: "wide",
  },
  {
    title: "The Witcher 3: Wild Hunt",
    description: "An open-world fantasy action-RPG following Geralt of Rivia on his quest to find his adopted daughter, praised for its storytelling.",
    type: "GAME",
    source: "CD Projekt Red",
    tags: ["rpg", "open-world", "fantasy", "story-driven"],
    url: "https://www.thewitcher.com/en/witcher3",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg",
  },
  {
    title: "Valorant",
    description: "A free-to-play 5v5 character-based tactical shooter by Riot Games blending precise gunplay with unique agent abilities.",
    type: "GAME",
    source: "Riot Games",
    tags: ["fps", "tactical", "esports", "competitive"],
    url: "https://playvalorant.com/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/440px-Valorant_logo_-_pink_color_version.svg.png",
  },
];

const MOVIES = [
  { title: "21", description: "A heist drama film about MIT students who master card counting to win millions at blackjack in Las Vegas.", type: "MOVIE", source: "Robert Luketic", tags: ["drama", "heist", "gambling", "thriller"], url: "https://en.wikipedia.org/wiki/21_(2008_film)" },
  { title: "A Quiet Place: Day One", description: "A post-apocalyptic horror prequel exploring the first day of the alien invasion that silenced humanity.", type: "MOVIE", source: "Michael Sarnoski", tags: ["horror", "sci-fi", "prequel", "thriller"], url: "https://en.wikipedia.org/wiki/A_Quiet_Place:_Day_One", imageUrl: "https://upload.wikimedia.org/wikipedia/en/6/6f/A_Quiet_Place_Day_One_poster.jpg" },
  { title: "Agent Carter", description: "A Marvel Television series following Peggy Carter as she navigates espionage in 1940s post-war America.", type: "MOVIE", source: "Marvel Television", tags: ["marvel", "spy", "period-drama", "tv-series"], url: "https://en.wikipedia.org/wiki/Agent_Carter_(TV_series)" },
  { title: "Agatha All Along", description: "A Marvel Studios television series following the witch Agatha Harkness on a dark magical journey.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "fantasy", "tv-series", "witchcraft"], url: "https://en.wikipedia.org/wiki/Agatha_All_Along" },
  { title: "Anatomy of a Fall", description: "A French legal drama thriller examining the complex evidence in a suspicious death from multiple perspectives.", type: "MOVIE", source: "Justine Triet", tags: ["drama", "thriller", "legal", "french"], url: "https://en.wikipedia.org/wiki/Anatomy_of_a_Fall", imageUrl: "https://upload.wikimedia.org/wikipedia/en/5/5f/Anatomy_of_a_Fall.jpg" },
  { title: "Ant-Man", description: "A Marvel Cinematic Universe superhero film about a thief who becomes a shrinking superhero.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "action", "comedy"], url: "https://en.wikipedia.org/wiki/Ant-Man_(film)", imageUrl: "https://upload.wikimedia.org/wikipedia/en/7/75/Ant-Man_poster.jpg" },
  { title: "Ant-Man and the Wasp", description: "The sequel to Marvel's Ant-Man featuring a new partner and a rescue mission into the quantum realm.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "action", "sequel"], url: "https://en.wikipedia.org/wiki/Ant-Man_and_the_Wasp" },
  { title: "Ant-Man and the Wasp: Quantumania", description: "The third Ant-Man film that plunges the heroes into the quantum realm to face Kang the Conqueror.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "action", "sci-fi"], url: "https://en.wikipedia.org/wiki/Ant-Man_and_the_Wasp:_Quantumania", imageUrl: "https://upload.wikimedia.org/wikipedia/en/e/ef/Ant-Man_and_the_Wasp_Quantumania_poster.jpg" },
  { title: "Avengers: Age of Ultron", description: "The second Avengers film where the team faces Ultron, an AI created by Tony Stark that threatens humanity.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "action", "avengers"], url: "https://en.wikipedia.org/wiki/Avengers:_Age_of_Ultron", imageUrl: "https://upload.wikimedia.org/wikipedia/en/f/ff/Avengers_Age_of_Ultron_poster.jpg" },
  { title: "Avengers: Endgame", description: "The epic culmination of the Infinity Saga where the Avengers make one final stand against Thanos.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "action", "epic"], url: "https://en.wikipedia.org/wiki/Avengers:_Endgame", imageUrl: "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg", size: "lg" },
  { title: "Avengers: Infinity War", description: "The third Avengers film where Earth's mightiest heroes unite against Thanos who seeks the Infinity Stones.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "action", "epic"], url: "https://en.wikipedia.org/wiki/Avengers:_Infinity_War", imageUrl: "https://upload.wikimedia.org/wikipedia/en/4/4d/Avengers_Infinity_War_poster.jpg" },
  { title: "Black Panther", description: "A Marvel film centered on T'Challa, king of the technologically advanced African nation of Wakanda.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "action", "wakanda"], url: "https://en.wikipedia.org/wiki/Black_Panther_(film)", imageUrl: "https://upload.wikimedia.org/wikipedia/en/1/1a/Black_Panther_film_poster.jpg" },
  { title: "Black Panther: Wakanda Forever", description: "The sequel honoring T'Challa's legacy as Wakanda faces a new underwater threat from Talokan.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "action", "sequel"], url: "https://en.wikipedia.org/wiki/Black_Panther:_Wakanda_Forever", imageUrl: "https://upload.wikimedia.org/wikipedia/en/3/3b/Black_Panther_Wakanda_Forever_poster.jpg" },
  { title: "Black Widow", description: "A Marvel film exploring Natasha Romanoff's past and her confrontation with a dangerous conspiracy.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "action", "spy"], url: "https://en.wikipedia.org/wiki/Black_Widow_(2021_film)", imageUrl: "https://upload.wikimedia.org/wikipedia/en/e/e9/Black_Widow_%282021_film%29_poster.jpg" },
  { title: "Captain America: Brave New World", description: "Sam Wilson takes up the Captain America mantle in this new chapter of the MCU.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "action", "sequel"], url: "https://en.wikipedia.org/wiki/Captain_America:_Brave_New_World" },
  { title: "Captain America: Civil War", description: "The Avengers fracture into opposing factions led by Captain America and Iron Man over government oversight.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "action", "political"], url: "https://en.wikipedia.org/wiki/Captain_America:_Civil_War", imageUrl: "https://upload.wikimedia.org/wikipedia/en/5/53/Captain_America_Civil_War_poster.jpg" },
  { title: "Captain America: The First Avenger", description: "The origin story of Steve Rogers transforming from a scrawny recruit into the super-soldier Captain America during WWII.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "origin", "war"], url: "https://en.wikipedia.org/wiki/Captain_America:_The_First_Avenger", imageUrl: "https://upload.wikimedia.org/wikipedia/en/3/37/Captain_America_The_First_Avenger_poster.jpg" },
  { title: "Captain America: The Winter Soldier", description: "Captain America uncovers a vast conspiracy within S.H.I.E.L.D. while facing a deadly assassin from his past.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "thriller", "action"], url: "https://en.wikipedia.org/wiki/Captain_America:_The_Winter_Soldier", imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/9e/Captain_America_The_Winter_Soldier.jpg" },
  { title: "Captain Marvel", description: "Carol Danvers discovers her identity as one of the universe's most powerful heroes in this cosmic MCU adventure.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "action", "cosmic"], url: "https://en.wikipedia.org/wiki/Captain_Marvel_(film)", imageUrl: "https://upload.wikimedia.org/wikipedia/en/4/4e/Captain_Marvel_poster.jpg" },
  { title: "Daredevil", description: "A Marvel Television series centered on blind lawyer Matt Murdock who fights crime as a vigilante in Hell's Kitchen.", type: "MOVIE", source: "Marvel Television", tags: ["marvel", "superhero", "crime", "tv-series"], url: "https://en.wikipedia.org/wiki/Daredevil_(TV_series)" },
  { title: "Daredevil: Born Again", description: "A Marvel Studios television series reviving Matt Murdock's story with new threats in Hell's Kitchen.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "crime", "tv-series"], url: "https://en.wikipedia.org/wiki/Daredevil:_Born_Again" },
  { title: "Deadpool & Wolverine", description: "A superhero comedy film uniting the irreverent Deadpool with the ferocious Wolverine in a multiverse adventure.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "comedy", "action", "superhero"], url: "https://en.wikipedia.org/wiki/Deadpool_%26_Wolverine", imageUrl: "https://upload.wikimedia.org/wikipedia/en/4/4c/Deadpool_%26_Wolverine_poster.jpg" },
  { title: "Doctor Strange", description: "A brilliant neurosurgeon discovers the mystic arts and becomes the Sorcerer Supreme, protector of reality.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "fantasy", "magic"], url: "https://en.wikipedia.org/wiki/Doctor_Strange_(2016_film)", imageUrl: "https://upload.wikimedia.org/wikipedia/en/c/c7/Doctor_Strange_poster.jpg" },
  { title: "Doctor Strange in the Multiverse of Madness", description: "Doctor Strange navigates a nightmarish multiverse while confronting a former ally corrupted by dark magic.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "horror", "multiverse"], url: "https://en.wikipedia.org/wiki/Doctor_Strange_in_the_Multiverse_of_Madness", imageUrl: "https://upload.wikimedia.org/wikipedia/en/1/17/Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg" },
  { title: "Dream Scenario", description: "A dark comedy fantasy film starring Nicolas Cage as a professor who inexplicably begins appearing in everyone's dreams.", type: "MOVIE", source: "Kristoffer Borgli", tags: ["comedy", "fantasy", "dark-comedy", "surreal"], url: "https://en.wikipedia.org/wiki/Dream_Scenario" },
  { title: "Dumb Money", description: "A biographical comedy-drama about the GameStop short squeeze and the retail investors who shook Wall Street.", type: "MOVIE", source: "Craig Gillespie", tags: ["comedy", "drama", "finance", "true-story"], url: "https://en.wikipedia.org/wiki/Dumb_Money" },
  { title: "Dune: Part Two", description: "The epic continuation following Paul Atreides as he joins the Fremen and confronts the powerful House Harkonnen.", type: "MOVIE", source: "Denis Villeneuve", tags: ["sci-fi", "epic", "action", "adaptation"], url: "https://en.wikipedia.org/wiki/Dune:_Part_Two", imageUrl: "https://upload.wikimedia.org/wikipedia/en/5/52/Dune_Part_Two_poster.jpeg", size: "lg" },
  { title: "Echo", description: "A Marvel Studios series about Maya Lopez, a deaf Indigenous woman with the ability to copy others' movements.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "action", "tv-series"], url: "https://en.wikipedia.org/wiki/Echo_(TV_series)" },
  { title: "Eternals", description: "Ancient immortal beings emerge from hiding to protect humanity from their evil counterparts, the Deviants.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "cosmic", "action"], url: "https://en.wikipedia.org/wiki/Eternals_(film)", imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/9b/Eternals_%28film%29_poster.jpg" },
  { title: "Fast & Furious", description: "A blockbuster action film franchise centered on street racing, heists, and a found family of adrenaline junkies.", type: "MOVIE", source: "Universal Pictures", tags: ["action", "cars", "franchise", "heist"], url: "https://en.wikipedia.org/wiki/Fast_%26_Furious" },
  { title: "Ferrari", description: "A biographical drama film about Enzo Ferrari during a pivotal summer of crisis and the iconic Mille Miglia race.", type: "MOVIE", source: "Michael Mann", tags: ["biography", "drama", "racing", "historical"], url: "https://en.wikipedia.org/wiki/Ferrari_(2023_film)" },
  { title: "Good Will Hunting", description: "A drama about a mathematical genius working as a janitor at MIT who must confront his troubled past with a therapist.", type: "MOVIE", source: "Gus Van Sant", tags: ["drama", "psychology", "coming-of-age", "classic"], url: "https://en.wikipedia.org/wiki/Good_Will_Hunting", imageUrl: "https://upload.wikimedia.org/wikipedia/en/5/52/Good_Will_Hunting.png" },
  { title: "Gran Turismo", description: "A biographical sports drama based on the true story of a teenage Gran Turismo player who becomes a real professional racer.", type: "MOVIE", source: "Neill Blomkamp", tags: ["sports", "drama", "racing", "true-story"], url: "https://en.wikipedia.org/wiki/Gran_Turismo_(film)" },
  { title: "Guardians of the Galaxy", description: "A band of intergalactic misfits must unite to protect a powerful cosmic artifact and save the galaxy.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "comedy", "cosmic"], url: "https://en.wikipedia.org/wiki/Guardians_of_the_Galaxy_(film)", imageUrl: "https://upload.wikimedia.org/wikipedia/en/b/b5/Guardians_of_the_Galaxy_poster.jpg" },
  { title: "Guardians of the Galaxy Vol. 2", description: "The Guardians unravel the mystery of Peter Quill's parentage while facing new galactic threats.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "comedy", "sequel"], url: "https://en.wikipedia.org/wiki/Guardians_of_the_Galaxy_Vol._2" },
  { title: "Guardians of the Galaxy Vol. 3", description: "The final chapter of the Guardians trilogy as Rocket's past threatens to destroy the team's future.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "comedy", "finale"], url: "https://en.wikipedia.org/wiki/Guardians_of_the_Galaxy_Vol._3", imageUrl: "https://upload.wikimedia.org/wikipedia/en/b/b2/Guardians_of_the_Galaxy_Vol._3_poster.jpg" },
  { title: "Hawkeye", description: "Clint Barton partners with young archer Kate Bishop to confront enemies from his past during Christmas.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "action", "tv-series"], url: "https://en.wikipedia.org/wiki/Hawkeye_(TV_series)" },
  { title: "How to Get Away with Murder", description: "A legal thriller series following a law professor and her students entangled in a web of murder and deception.", type: "MOVIE", source: "ABC Studios", tags: ["thriller", "legal", "drama", "tv-series"], url: "https://en.wikipedia.org/wiki/How_to_Get_Away_with_Murder" },
  { title: "Inception", description: "A mind-bending sci-fi thriller about a team that infiltrates dreams to plant an idea in a target's subconscious.", type: "MOVIE", source: "Christopher Nolan", tags: ["sci-fi", "thriller", "action", "mind-bending"], url: "https://en.wikipedia.org/wiki/Inception", imageUrl: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg", size: "lg" },
  { title: "Inside Out 2", description: "Riley enters teenagehood as new complex emotions join Joy, Sadness, and the crew inside her mind.", type: "MOVIE", source: "Pixar", tags: ["animation", "comedy", "coming-of-age", "pixar"], url: "https://en.wikipedia.org/wiki/Inside_Out_2", imageUrl: "https://upload.wikimedia.org/wikipedia/en/f/f7/Inside_Out_2_poster.jpg" },
  { title: "Interstellar", description: "An epic journey through a wormhole near Saturn to find a new home for humanity as Earth becomes uninhabitable.", type: "MOVIE", source: "Christopher Nolan", tags: ["sci-fi", "space", "epic", "drama"], url: "https://en.wikipedia.org/wiki/Interstellar_(film)", imageUrl: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg", size: "lg" },
  { title: "Iron Fist", description: "A Marvel Television series about martial artist Danny Rand who returns to New York with mystical powers.", type: "MOVIE", source: "Marvel Television", tags: ["marvel", "superhero", "martial-arts", "tv-series"], url: "https://en.wikipedia.org/wiki/Iron_Fist_(TV_series)" },
  { title: "Iron Man", description: "The film that launched the Marvel Cinematic Universe, following Tony Stark as he builds a powered suit of armor.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "action", "origin"], url: "https://en.wikipedia.org/wiki/Iron_Man_(2008_film)", imageUrl: "https://upload.wikimedia.org/wikipedia/en/0/02/Iron_Man_%282008_film%29_poster.jpg" },
  { title: "Iron Man 2", description: "Tony Stark faces a new enemy while dealing with the world knowing his identity as Iron Man.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "action", "sequel"], url: "https://en.wikipedia.org/wiki/Iron_Man_2" },
  { title: "Iron Man 3", description: "Tony Stark faces the Mandarin while dealing with PTSD from the Battle of New York.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "action", "thriller"], url: "https://en.wikipedia.org/wiki/Iron_Man_3" },
  { title: "Jessica Jones", description: "A Marvel series about a private investigator with superpowers dealing with trauma and solving dark cases.", type: "MOVIE", source: "Marvel Television", tags: ["marvel", "noir", "superhero", "tv-series"], url: "https://en.wikipedia.org/wiki/Jessica_Jones_(TV_series)" },
  { title: "Killers of the Flower Moon", description: "An epic western crime drama by Martin Scorsese about the Osage Nation murders in 1920s Oklahoma.", type: "MOVIE", source: "Martin Scorsese", tags: ["crime", "drama", "historical", "western"], url: "https://en.wikipedia.org/wiki/Killers_of_the_Flower_Moon_(film)", imageUrl: "https://upload.wikimedia.org/wikipedia/en/5/5c/Killers_of_the_Flower_Moon_film_poster.jpg", size: "wide" },
  { title: "Loki", description: "The God of Mischief steps out of his brother's shadow and into a time-bending adventure across the multiverse.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "fantasy", "tv-series"], url: "https://en.wikipedia.org/wiki/Loki_(TV_series)", imageUrl: "https://upload.wikimedia.org/wikipedia/en/6/6a/Loki_season_1_poster.jpg" },
  { title: "Luke Cage", description: "A Marvel series about a Harlem hero with unbreakable skin fighting crime and corruption in his neighborhood.", type: "MOVIE", source: "Marvel Television", tags: ["marvel", "superhero", "crime", "tv-series"], url: "https://en.wikipedia.org/wiki/Luke_Cage_(TV_series)" },
  { title: "Mad Max: Fury Road", description: "A relentless, post-apocalyptic action masterpiece about survival and redemption on a desolate desert highway.", type: "MOVIE", source: "George Miller", tags: ["action", "post-apocalyptic", "thriller", "masterpiece"], url: "https://en.wikipedia.org/wiki/Mad_Max:_Fury_Road", imageUrl: "https://upload.wikimedia.org/wikipedia/en/6/6e/Mad_Max_Fury_Road.jpg" },
  { title: "Money Heist", description: "A Spanish heist crime drama following a criminal mastermind known as 'The Professor' and his elaborate bank robberies.", type: "MOVIE", source: "Netflix", tags: ["heist", "crime", "thriller", "spanish"], url: "https://en.wikipedia.org/wiki/Money_Heist", imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/9e/Money_Heist_season_5_part_2_poster.jpg" },
  { title: "Moon Knight", description: "A Marvel series about a mercenary with dissociative identity disorder who becomes the avatar of an Egyptian god.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "psychological", "tv-series"], url: "https://en.wikipedia.org/wiki/Moon_Knight_(TV_series)" },
  { title: "Ms. Marvel", description: "A Marvel series about Kamala Khan, a Pakistani-American teenager who discovers cosmic powers.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "coming-of-age", "tv-series"], url: "https://en.wikipedia.org/wiki/Ms._Marvel_(TV_series)" },
  { title: "Oppenheimer", description: "A biographical thriller about J. Robert Oppenheimer and the development of the atomic bomb during WWII.", type: "MOVIE", source: "Christopher Nolan", tags: ["biography", "drama", "historical", "war"], url: "https://en.wikipedia.org/wiki/Oppenheimer_(film)", imageUrl: "https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg", size: "lg" },
  { title: "Ozark", description: "A crime drama following a financial advisor who launders money for a drug cartel and relocates to the Ozarks.", type: "MOVIE", source: "Netflix", tags: ["crime", "drama", "thriller", "tv-series"], url: "https://en.wikipedia.org/wiki/Ozark_(TV_series)" },
  { title: "Poor Things", description: "A surreal comedy-drama starring Emma Stone as a resurrected woman exploring Victorian society with childlike wonder.", type: "MOVIE", source: "Yorgos Lanthimos", tags: ["comedy", "drama", "surreal", "period"], url: "https://en.wikipedia.org/wiki/Poor_Things_(film)", imageUrl: "https://upload.wikimedia.org/wikipedia/en/7/7d/Poor_Things_film_poster.png" },
  { title: "Pulp Fiction", description: "Quentin Tarantino's iconic neo-noir crime film weaving interconnected stories of Los Angeles criminals.", type: "MOVIE", source: "Quentin Tarantino", tags: ["crime", "neo-noir", "classic", "cult"], url: "https://en.wikipedia.org/wiki/Pulp_Fiction", imageUrl: "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg", size: "lg" },
  { title: "Saltburn", description: "A psychological thriller about a student who becomes dangerously obsessed with his wealthy classmate's aristocratic family.", type: "MOVIE", source: "Emerald Fennell", tags: ["thriller", "psychological", "drama", "dark"], url: "https://en.wikipedia.org/wiki/Saltburn_(film)" },
  { title: "Secret Invasion", description: "A Marvel series revealing a covert Skrull invasion that has infiltrated the highest levels of Earth's governments.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "spy", "thriller", "tv-series"], url: "https://en.wikipedia.org/wiki/Secret_Invasion_(TV_series)" },
  { title: "Shang-Chi and the Legend of the Ten Rings", description: "A martial arts superhero film following Shang-Chi as he confronts his father's criminal empire.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "martial-arts", "action"], url: "https://en.wikipedia.org/wiki/Shang-Chi_and_the_Legend_of_the_Ten_Rings", imageUrl: "https://upload.wikimedia.org/wikipedia/en/7/74/Shang-Chi_and_the_Legend_of_the_Ten_Rings_poster.jpg" },
  { title: "She-Hulk: Attorney at Law", description: "A comedy series about lawyer Jennifer Walters who gains Hulk powers and navigates both law and superheroics.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "comedy", "superhero", "tv-series"], url: "https://en.wikipedia.org/wiki/She-Hulk:_Attorney_at_Law" },
  { title: "Spider-Man: Far From Home", description: "Peter Parker's European vacation is interrupted when Nick Fury recruits him to battle elemental creatures.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "action", "adventure"], url: "https://en.wikipedia.org/wiki/Spider-Man:_Far_From_Home", imageUrl: "https://upload.wikimedia.org/wikipedia/en/b/bd/Spider-Man_Far_From_Home_poster.jpg" },
  { title: "Spider-Man: Homecoming", description: "Peter Parker balances high school life with being Spider-Man under Tony Stark's mentorship.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "coming-of-age", "action"], url: "https://en.wikipedia.org/wiki/Spider-Man:_Homecoming", imageUrl: "https://upload.wikimedia.org/wikipedia/en/f/f9/Spider-Man_Homecoming_poster.jpg" },
  { title: "Spider-Man: No Way Home", description: "The multiverse shatters open, bringing villains from other dimensions in this epic MCU Spider-Man chapter.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "multiverse", "action"], url: "https://en.wikipedia.org/wiki/Spider-Man:_No_Way_Home", imageUrl: "https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg", size: "lg" },
  { title: "The Avengers", description: "Earth's mightiest heroes assemble for the first time to stop Loki and his alien army from conquering Earth.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "action", "team-up"], url: "https://en.wikipedia.org/wiki/The_Avengers_(2012_film)", imageUrl: "https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg" },
  { title: "The Color Purple", description: "A musical coming-of-age period drama celebrating resilience, sisterhood, and the African American experience.", type: "MOVIE", source: "Blitz Bazawule", tags: ["musical", "drama", "period", "adaptation"], url: "https://en.wikipedia.org/wiki/The_Color_Purple_(2023_film)" },
  { title: "The Defenders", description: "A Marvel Television miniseries crossover uniting Daredevil, Jessica Jones, Luke Cage, and Iron Fist.", type: "MOVIE", source: "Marvel Television", tags: ["marvel", "superhero", "crossover", "tv-series"], url: "https://en.wikipedia.org/wiki/The_Defenders_(miniseries)" },
  { title: "The Equalizer 3", description: "Robert McCall settles in southern Italy only to discover his new friends are under the control of local crime bosses.", type: "MOVIE", source: "Antoine Fuqua", tags: ["action", "thriller", "crime", "sequel"], url: "https://en.wikipedia.org/wiki/The_Equalizer_3" },
  { title: "The Falcon and the Winter Soldier", description: "Sam Wilson and Bucky Barnes team up to navigate a post-Blip world and confront the Flag Smashers.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "action", "tv-series"], url: "https://en.wikipedia.org/wiki/The_Falcon_and_the_Winter_Soldier" },
  { title: "The Fantastic Four: First Steps", description: "Marvel's first family makes their MCU debut in this highly anticipated cosmic adventure.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "cosmic", "origin"], url: "https://en.wikipedia.org/wiki/The_Fantastic_Four:_First_Steps" },
  { title: "The Godfather", description: "Francis Ford Coppola's masterpiece following the Corleone crime family and the reluctant rise of Michael Corleone.", type: "MOVIE", source: "Francis Ford Coppola", tags: ["crime", "drama", "classic", "masterpiece"], url: "https://en.wikipedia.org/wiki/The_Godfather", imageUrl: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg", size: "lg" },
  { title: "The Holdovers", description: "A grumpy prep school teacher bonds with a student and a cook during Christmas break in 1970s New England.", type: "MOVIE", source: "Alexander Payne", tags: ["comedy", "drama", "period", "heartwarming"], url: "https://en.wikipedia.org/wiki/The_Holdovers" },
  { title: "The Incredible Hulk", description: "Bruce Banner seeks a cure for his condition while being pursued by the military and a monstrous adversary.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "action", "sci-fi"], url: "https://en.wikipedia.org/wiki/The_Incredible_Hulk_(film)" },
  { title: "The Iron Claw", description: "A biographical sports drama chronicling the tragic story of the Von Erich wrestling family.", type: "MOVIE", source: "Sean Durkin", tags: ["biography", "sports", "drama", "wrestling"], url: "https://en.wikipedia.org/wiki/The_Iron_Claw_(film)" },
  { title: "The Killer", description: "David Fincher's action thriller following an elite assassin whose meticulous methods are tested after a botched job.", type: "MOVIE", source: "David Fincher", tags: ["thriller", "action", "crime", "noir"], url: "https://en.wikipedia.org/wiki/The_Killer_(2023_film)" },
  { title: "The Marvels", description: "Captain Marvel, Ms. Marvel, and Monica Rambeau team up when their powers become mysteriously entangled.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "cosmic", "team-up"], url: "https://en.wikipedia.org/wiki/The_Marvels" },
  { title: "The Matrix", description: "A seminal sci-fi action film exploring a simulated reality where humanity is unknowingly enslaved by machines.", type: "MOVIE", source: "The Wachowskis", tags: ["sci-fi", "action", "classic", "cyberpunk"], url: "https://en.wikipedia.org/wiki/The_Matrix", imageUrl: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg", size: "lg" },
  { title: "The Punisher", description: "A Marvel series following Frank Castle, a vigilante who wages a brutal war against criminals.", type: "MOVIE", source: "Marvel Television", tags: ["marvel", "action", "crime", "tv-series"], url: "https://en.wikipedia.org/wiki/The_Punisher_(TV_series)" },
  { title: "The Social Network", description: "A biographical drama about the founding of Facebook and the legal battles that followed its meteoric rise.", type: "MOVIE", source: "David Fincher", tags: ["biography", "drama", "technology", "classic"], url: "https://en.wikipedia.org/wiki/The_Social_Network", imageUrl: "https://upload.wikimedia.org/wikipedia/en/8/8c/The_Social_Network_film_poster.png" },
  { title: "The Zone of Interest", description: "A haunting historical drama depicting the mundane domestic life of the Auschwitz commandant's family.", type: "MOVIE", source: "Jonathan Glazer", tags: ["drama", "historical", "war", "art-house"], url: "https://en.wikipedia.org/wiki/The_Zone_of_Interest_(film)" },
  { title: "Thor", description: "The God of Thunder is banished to Earth where he must prove himself worthy of his power.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "fantasy", "origin"], url: "https://en.wikipedia.org/wiki/Thor_(film)", imageUrl: "https://upload.wikimedia.org/wikipedia/en/f/fc/Thor_posterUS.jpg" },
  { title: "Thor: Love and Thunder", description: "Thor enlists allies including Jane Foster as the Mighty Thor to face Gorr the God Butcher.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "comedy", "cosmic"], url: "https://en.wikipedia.org/wiki/Thor:_Love_and_Thunder" },
  { title: "Thor: Ragnarok", description: "Thor must survive a gladiatorial contest and stop the goddess Hela from destroying Asgard.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "comedy", "action"], url: "https://en.wikipedia.org/wiki/Thor:_Ragnarok", imageUrl: "https://upload.wikimedia.org/wikipedia/en/7/7d/Thor_Ragnarok_poster.jpg" },
  { title: "Thor: The Dark World", description: "Thor battles the Dark Elves who seek to plunge the universe into darkness using the Aether.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "fantasy", "sequel"], url: "https://en.wikipedia.org/wiki/Thor:_The_Dark_World" },
  { title: "Thunderbolts*", description: "A team of antiheroes and morally gray characters unite for a dangerous mission in the MCU.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "action", "antihero"], url: "https://en.wikipedia.org/wiki/Thunderbolts*" },
  { title: "WandaVision", description: "Wanda and Vision live an idealized suburban life through TV sitcom eras while a darker reality lurks beneath.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "superhero", "mystery", "tv-series"], url: "https://en.wikipedia.org/wiki/WandaVision", imageUrl: "https://upload.wikimedia.org/wikipedia/en/0/0a/WandaVision_logo_%28Jan_2021%29.png" },
  { title: "We're the Millers", description: "A comedy about a small-time pot dealer who creates a fake family to smuggle drugs from Mexico.", type: "MOVIE", source: "Rawson Marshall Thurber", tags: ["comedy", "crime", "road-trip", "family"], url: "https://en.wikipedia.org/wiki/We%27re_the_Millers" },
  { title: "What If...?", description: "An animated Marvel series exploring alternate timelines and what-if scenarios across the multiverse.", type: "MOVIE", source: "Marvel Studios", tags: ["marvel", "animation", "multiverse", "tv-series"], url: "https://en.wikipedia.org/wiki/What_If...%3F_(TV_series)" },
];

const MUSIC = [
  {
    title: "Drake",
    description: "A highly successful Canadian rapper, singer, and songwriter known for blending rap, R&B, and pop genres.",
    type: "MUSIC",
    source: "OVO Sound / Republic Records",
    tags: ["hip-hop", "r&b", "pop", "canadian"],
    url: "https://en.wikipedia.org/wiki/Drake_(musician)",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Drake_July_2016.jpg/440px-Drake_July_2016.jpg",
  },
  {
    title: "Led Zeppelin",
    description: "A legendary English rock band formed in 1968, pioneers of hard rock and heavy metal with iconic guitar riffs.",
    type: "MUSIC",
    source: "Atlantic Records",
    tags: ["rock", "classic-rock", "hard-rock", "legendary"],
    url: "https://en.wikipedia.org/wiki/Led_Zeppelin",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Led_Zeppelin_-_promotional_image_%281971%29.jpg/440px-Led_Zeppelin_-_promotional_image_%281971%29.jpg",
  },
  {
    title: "Mama's Son",
    description: "A heartfelt music track by Ishmael Barre, available on major streaming platforms like Spotify.",
    type: "MUSIC",
    source: "Ishmael Barre",
    tags: ["single", "spotify", "indie", "soulful"],
    url: "https://open.spotify.com/",
  },
  {
    title: "Pink Floyd",
    description: "An influential English rock band known for progressive and psychedelic music, concept albums, and elaborate live shows.",
    type: "MUSIC",
    source: "Harvest / Columbia Records",
    tags: ["progressive-rock", "psychedelic", "classic", "art-rock"],
    url: "https://en.wikipedia.org/wiki/Pink_Floyd",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png",
    size: "lg",
  },
  {
    title: "Taylor Swift",
    description: "An American singer-songwriter and massive global pop icon known for genre-spanning albums and record-breaking tours.",
    type: "MUSIC",
    source: "Republic Records",
    tags: ["pop", "country", "singer-songwriter", "icon"],
    url: "https://en.wikipedia.org/wiki/Taylor_Swift",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Taylor_Swift_at_the_2023_MTV_Video_Music_Awards_4.png/440px-Taylor_Swift_at_the_2023_MTV_Video_Music_Awards_4.png",
  },
  {
    title: "The Beatles",
    description: "The iconic and highly influential English rock band formed in Liverpool, widely regarded as the greatest band ever.",
    type: "MUSIC",
    source: "Apple Records",
    tags: ["rock", "pop", "classic", "british-invasion"],
    url: "https://en.wikipedia.org/wiki/The_Beatles",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/The_Beatles_members_at_New_York_City_in_1964.jpg/500px-The_Beatles_members_at_New_York_City_in_1964.jpg",
    size: "wide",
  },
  {
    title: "The Weeknd",
    description: "A prominent Canadian singer and songwriter known for dark R&B aesthetics and chart-topping pop hits.",
    type: "MUSIC",
    source: "XO / Republic Records",
    tags: ["r&b", "pop", "alternative", "canadian"],
    url: "https://en.wikipedia.org/wiki/The_Weeknd",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/The_Weeknd_with_hand_up.jpg/440px-The_Weeknd_with_hand_up.jpg",
  },
];

const SHOPPING = [
  {
    title: "2% Salicylic Acid Body Wash",
    description: "A skincare product by mCaffeine designed to control body odor and gently exfoliate with salicylic acid.",
    type: "SHOPPING",
    source: "mCaffeine",
    tags: ["skincare", "body-wash", "salicylic-acid", "exfoliating"],
    url: "https://www.mcaffeine.com/",
  },
  {
    title: "Apple MacBook Pro M3",
    description: "A high-performance laptop by Apple featuring the revolutionary M3 silicon chip for pro-level workflows.",
    type: "SHOPPING",
    source: "Apple",
    tags: ["laptop", "apple", "m3", "pro"],
    url: "https://www.apple.com/macbook-pro/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/MacBook_Pro_14%22_M3_Space_Black_%28closed%29.jpg/560px-MacBook_Pro_14%22_M3_Space_Black_%28closed%29.jpg",
    size: "wide",
  },
  {
    title: "Bose QuietComfort 45",
    description: "Premium noise-canceling over-ear wireless headphones with legendary Bose sound quality and comfort.",
    type: "SHOPPING",
    source: "Bose",
    tags: ["headphones", "noise-canceling", "wireless", "premium"],
    url: "https://www.bose.com/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Bose_QuietComfort_45.jpg/440px-Bose_QuietComfort_45.jpg",
  },
  {
    title: "Brightening Raspberry Rush Body Wash",
    description: "A fruit-scented body wash product by mCaffeine for brightening and refreshing skin.",
    type: "SHOPPING",
    source: "mCaffeine",
    tags: ["skincare", "body-wash", "brightening", "raspberry"],
    url: "https://www.mcaffeine.com/",
  },
  {
    title: "Caramel Eclairs Coffee Body Scrub",
    description: "An exfoliating skincare product by mCaffeine infused with coffee and caramel for smooth skin.",
    type: "SHOPPING",
    source: "mCaffeine",
    tags: ["skincare", "body-scrub", "coffee", "exfoliating"],
    url: "https://www.mcaffeine.com/",
  },
  {
    title: "GIGABYTE GA-H110M-H",
    description: "A micro ATX motherboard for desktop computers supporting Intel 6th/7th gen processors.",
    type: "SHOPPING",
    source: "GIGABYTE",
    tags: ["motherboard", "computer", "hardware", "intel"],
    url: "https://www.gigabyte.com/",
  },
  {
    title: "Nike Air Force 1",
    description: "A classic and iconic model of athletic shoes by Nike, a cultural staple in streetwear fashion since 1982.",
    type: "SHOPPING",
    source: "Nike",
    tags: ["shoes", "sneakers", "fashion", "classic"],
    url: "https://www.nike.com/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Air_Force_1_Low.jpg/440px-Air_Force_1_Low.jpg",
  },
  {
    title: "Sennheiser Momentum 4",
    description: "High-fidelity wireless noise-canceling headphones with exceptional audio quality and adaptive ANC.",
    type: "SHOPPING",
    source: "Sennheiser",
    tags: ["headphones", "wireless", "hi-fi", "noise-canceling"],
    url: "https://www.sennheiser.com/",
  },
  {
    title: "Sony WH-1000XM5",
    description: "Industry-leading wireless noise-canceling headphones by Sony with exceptional sound and 30-hour battery life.",
    type: "SHOPPING",
    source: "Sony",
    tags: ["headphones", "wireless", "noise-canceling", "premium"],
    url: "https://www.sony.com/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Sony-wh-1000xm5.jpg/440px-Sony-wh-1000xm5.jpg",
  },
];

const LINKS = [
  { title: "Arc Browser", description: "A modern, tab-management-focused web browser by The Browser Company reimagining how we browse the internet.", type: "LINK", source: "The Browser Company", tags: ["browser", "productivity", "modern"], url: "https://arc.net" },
  { title: "Brave Browser", description: "A privacy-focused web browser that blocks trackers and ads by default for faster, safer browsing.", type: "LINK", source: "Brave Software", tags: ["browser", "privacy", "security"], url: "https://brave.com" },
  { title: "Claude AI", description: "The web interface for interacting with Anthropic's Claude AI assistant for research, writing, and coding.", type: "LINK", source: "Anthropic", tags: ["ai", "assistant", "chatbot"], url: "https://claude.ai" },
  { title: "Cursor", description: "An AI-powered code editor built on top of VS Code that accelerates software development with AI assistance.", type: "LINK", source: "Cursor Inc.", tags: ["code-editor", "ai", "developer-tools"], url: "https://cursor.sh" },
  { title: "Digital Book", description: "A platform offering free audiobooks and eBooks from the public domain.", type: "LINK", source: "digitalbook.io", tags: ["books", "audiobooks", "free", "reading"], url: "https://digitalbook.io" },
  { title: "Discord", description: "A communication platform for communities with voice, video, and text channels used by gamers and teams.", type: "LINK", source: "Discord Inc.", tags: ["communication", "community", "voice-chat"], url: "https://discord.com" },
  { title: "DNS Leak Test", description: "A tool to test if your VPN is leaking DNS queries, ensuring your online privacy and security.", type: "LINK", source: "dnsleaktest.com", tags: ["privacy", "vpn", "security", "testing"], url: "https://dnsleaktest.com" },
  { title: "Docker Documentation", description: "The official documentation site for Docker containerization platform.", type: "LINK", source: "Docker", tags: ["docker", "containers", "devops", "documentation"], url: "https://docs.docker.com" },
  { title: "Anthropic Skills (GitHub)", description: "A GitHub repository containing AI skills and tools by Anthropic.", type: "LINK", source: "GitHub", tags: ["github", "ai", "skills", "anthropic"], url: "https://github.com/anthropics/skills" },
  { title: "React (GitHub)", description: "The official GitHub repository for the React JavaScript library for building user interfaces.", type: "LINK", source: "GitHub / Meta", tags: ["github", "react", "javascript", "frontend"], url: "https://github.com/facebook/react" },
  { title: "shadcn/ui (GitHub)", description: "A collection of beautifully designed, re-usable components built with Radix UI and Tailwind CSS.", type: "LINK", source: "GitHub / shadcn", tags: ["github", "ui", "components", "tailwind"], url: "https://github.com/shadcn/ui" },
  { title: "Deno Deploy", description: "A globally distributed serverless platform for running JavaScript and TypeScript at the edge.", type: "LINK", source: "Deno", tags: ["serverless", "deployment", "edge", "typescript"], url: "https://deno.com/deploy" },
  { title: "Cloudflare Pages", description: "A JAMstack platform for hosting fast, secure websites with automatic CI/CD from Git.", type: "LINK", source: "Cloudflare", tags: ["hosting", "jamstack", "cdn", "deployment"], url: "https://pages.cloudflare.com" },
  { title: "Render", description: "A unified cloud platform for building and running web apps, APIs, and databases with zero DevOps.", type: "LINK", source: "Render", tags: ["hosting", "cloud", "deployment", "devops"], url: "https://render.com" },
  { title: "Surge", description: "A simple, single-command web publishing tool for frontend developers to ship static sites.", type: "LINK", source: "Surge", tags: ["hosting", "static", "deployment", "cli"], url: "https://surge.sh" },
  { title: "Kubernetes", description: "The official website and documentation for the open-source container orchestration platform.", type: "LINK", source: "CNCF", tags: ["kubernetes", "containers", "orchestration", "devops"], url: "https://kubernetes.io" },
  { title: "Mailwave", description: "A service for creating free disposable temporary email addresses for privacy and testing.", type: "LINK", source: "Mailwave", tags: ["email", "privacy", "temporary", "tools"], url: "https://mailwave.dev" },
  { title: "Google Meet", description: "Google's video conferencing service for secure, high-quality virtual meetings and collaboration.", type: "LINK", source: "Google", tags: ["video-conferencing", "meetings", "google", "communication"], url: "https://meet.google.com" },
  { title: "Notion", description: "An all-in-one productivity workspace for notes, docs, project management, and team collaboration.", type: "LINK", source: "Notion Labs", tags: ["productivity", "notes", "project-management", "workspace"], url: "https://notion.so" },
  { title: "Obsidian", description: "A powerful knowledge base that works on local plain text Markdown files with a graph view of connections.", type: "LINK", source: "Obsidian", tags: ["notes", "knowledge-base", "markdown", "local-first"], url: "https://obsidian.md" },
  { title: "PostgresML", description: "A machine learning extension for PostgreSQL that brings ML models directly into your database queries.", type: "LINK", source: "PostgresML", tags: ["machine-learning", "postgresql", "database", "ai"], url: "https://postgresml.org" },
  { title: "Roam Research", description: "A note-taking tool for networked thought with bi-directional links and graph-based knowledge management.", type: "LINK", source: "Roam Research", tags: ["notes", "networked-thought", "research", "knowledge-graph"], url: "https://roamresearch.com" },
  { title: "UIDAI (Aadhaar)", description: "The official website of the Unique Identification Authority of India for Aadhaar enrollment and services.", type: "LINK", source: "Government of India", tags: ["government", "aadhaar", "identity", "india"], url: "https://uidai.gov.in" },
  { title: "Zoom", description: "A leading video communications platform for meetings, webinars, and team collaboration.", type: "LINK", source: "Zoom Video Communications", tags: ["video-conferencing", "meetings", "communication", "remote-work"], url: "https://zoom.us" },
];

const TOOLS = [
  { title: "AWS", description: "Amazon Web Services — the world's most comprehensive cloud computing platform with 200+ services.", type: "SOFTWARE", source: "Amazon", tags: ["cloud", "infrastructure", "aws", "devops"], url: "https://aws.amazon.com/" },
  { title: "Amazon", description: "A multinational technology giant dominating e-commerce, cloud computing, AI, and digital streaming.", type: "SOFTWARE", source: "Amazon", tags: ["e-commerce", "cloud", "technology", "big-tech"], url: "https://www.amazon.com/" },
  { title: "Amazon Prime Video", description: "A subscription streaming service offering movies, TV shows, and Amazon original content.", type: "SOFTWARE", source: "Amazon", tags: ["streaming", "entertainment", "video", "subscription"], url: "https://www.primevideo.com/" },
  { title: "Animista", description: "An on-demand CSS animations library where you can preview, customize, and generate animation code.", type: "SOFTWARE", source: "Animista", tags: ["css", "animations", "design", "developer-tools"], url: "https://animista.net/" },
  { title: "Anyscale", description: "A managed Ray platform for scaling AI and Python applications across distributed infrastructure.", type: "SOFTWARE", source: "Anyscale", tags: ["ai", "scaling", "ray", "distributed-computing"], url: "https://www.anyscale.com/" },
  { title: "Apple Notes", description: "A simple but powerful note-taking app by Apple for capturing ideas, lists, and sketches.", type: "SOFTWARE", source: "Apple", tags: ["notes", "productivity", "apple", "ios"], url: "https://www.icloud.com/notes" },
  { title: "Azure", description: "Microsoft's cloud computing platform offering IaaS, PaaS, and SaaS for enterprise workloads.", type: "SOFTWARE", source: "Microsoft", tags: ["cloud", "microsoft", "infrastructure", "enterprise"], url: "https://azure.microsoft.com/" },
  { title: "ChatGPT", description: "An AI chatbot by OpenAI capable of natural conversation, content creation, and problem-solving.", type: "SOFTWARE", source: "OpenAI", tags: ["ai", "chatbot", "llm", "assistant"], url: "https://chat.openai.com/" },
  { title: "Chroma", description: "An open-source AI-native vector database for building LLM-powered applications with embeddings.", type: "SOFTWARE", source: "Chroma", tags: ["vector-database", "ai", "embeddings", "open-source"], url: "https://www.trychroma.com/" },
  { title: "Claude", description: "An AI assistant by Anthropic designed for safe, helpful, and honest conversations and complex tasks.", type: "SOFTWARE", source: "Anthropic", tags: ["ai", "assistant", "llm", "safety"], url: "https://claude.ai" },
  { title: "Clerk", description: "A user authentication and management service providing drop-in UI components for modern apps.", type: "SOFTWARE", source: "Clerk", tags: ["auth", "authentication", "saas", "developer-tools"], url: "https://clerk.com/" },
  { title: "Cloudflare", description: "A web performance and security company providing CDN, DDoS mitigation, and edge computing services.", type: "SOFTWARE", source: "Cloudflare", tags: ["cdn", "security", "performance", "edge"], url: "https://www.cloudflare.com/" },
  { title: "Cluely", description: "An AI-powered tool for recording, transcribing, and analyzing meetings with actionable insights.", type: "SOFTWARE", source: "Cluely", tags: ["ai", "meetings", "transcription", "productivity"], url: "https://cluely.com/" },
  { title: "Datadog", description: "A monitoring and analytics platform for cloud infrastructure, applications, and logs.", type: "SOFTWARE", source: "Datadog", tags: ["monitoring", "observability", "cloud", "devops"], url: "https://www.datadoghq.com/" },
  { title: "Docker", description: "A platform for building, shipping, and running applications in lightweight, portable containers.", type: "SOFTWARE", source: "Docker", tags: ["containers", "devops", "deployment", "infrastructure"], url: "https://www.docker.com/" },
  { title: "Elastic", description: "A search and analytics engine powering data exploration, observability, and security solutions.", type: "SOFTWARE", source: "Elastic", tags: ["search", "analytics", "observability", "data"], url: "https://www.elastic.co/" },
  { title: "Evernote", description: "A note-taking and task management application for capturing and organizing ideas across devices.", type: "SOFTWARE", source: "Evernote", tags: ["notes", "productivity", "organization", "cross-platform"], url: "https://evernote.com/" },
  { title: "Figma", description: "A collaborative web-based interface design and prototyping tool for teams building digital products.", type: "SOFTWARE", source: "Figma", tags: ["design", "ui", "collaboration", "prototyping"], url: "https://www.figma.com/" },
  { title: "GCP", description: "Google Cloud Platform — a suite of cloud computing services running on the same infrastructure as Google.", type: "SOFTWARE", source: "Google", tags: ["cloud", "google", "infrastructure", "ai"], url: "https://cloud.google.com/" },
  { title: "Gemini", description: "Google's multimodal AI model family capable of understanding text, images, video, and code.", type: "SOFTWARE", source: "Google DeepMind", tags: ["ai", "llm", "multimodal", "google"], url: "https://gemini.google.com/" },
  { title: "GitHub", description: "The world's leading platform for version control, collaboration, and open-source software development.", type: "SOFTWARE", source: "GitHub / Microsoft", tags: ["git", "version-control", "open-source", "developer-tools"], url: "https://github.com/" },
  { title: "Google Keep", description: "A lightweight note-taking service by Google for quick notes, lists, and reminders.", type: "SOFTWARE", source: "Google", tags: ["notes", "productivity", "google", "reminders"], url: "https://keep.google.com/" },
  { title: "Google Lens", description: "An AI-powered image recognition technology that identifies objects, text, and places from photos.", type: "SOFTWARE", source: "Google", tags: ["ai", "image-recognition", "visual-search", "mobile"], url: "https://lens.google.com/" },
  { title: "Grafana", description: "An open-source platform for monitoring, visualization, and analytics with beautiful dashboards.", type: "SOFTWARE", source: "Grafana Labs", tags: ["monitoring", "visualization", "dashboards", "open-source"], url: "https://grafana.com/" },
  { title: "Instagram", description: "A photo and video sharing social networking platform for visual storytelling and connecting with others.", type: "SOFTWARE", source: "Meta", tags: ["social-media", "photos", "video", "community"], url: "https://www.instagram.com/" },
  { title: "Jira", description: "An issue tracking and agile project management tool by Atlassian used by software development teams.", type: "SOFTWARE", source: "Atlassian", tags: ["project-management", "agile", "issue-tracking", "devops"], url: "https://www.atlassian.com/software/jira" },
  { title: "Kubernetes", description: "An open-source container orchestration system for automating deployment, scaling, and management.", type: "SOFTWARE", source: "CNCF", tags: ["containers", "orchestration", "devops", "infrastructure"], url: "https://kubernetes.io/" },
  { title: "Linear", description: "A streamlined issue tracking tool built for modern product teams with beautiful UI and fast performance.", type: "SOFTWARE", source: "Linear", tags: ["issue-tracking", "project-management", "developer-tools", "startup"], url: "https://linear.app/" },
  { title: "LlamaIndex", description: "A data framework for connecting custom data sources to large language models for RAG applications.", type: "SOFTWARE", source: "LlamaIndex", tags: ["ai", "llm", "rag", "data-framework"], url: "https://www.llamaindex.ai/" },
  { title: "Meta AI", description: "An AI assistant by Meta integrated across its family of apps for conversation and creative tasks.", type: "SOFTWARE", source: "Meta", tags: ["ai", "assistant", "llm", "meta"], url: "https://www.meta.ai/" },
  { title: "Microsoft Copilot", description: "An AI companion by Microsoft integrated into Windows, Office, and developer tools for enhanced productivity.", type: "SOFTWARE", source: "Microsoft", tags: ["ai", "assistant", "productivity", "microsoft"], url: "https://copilot.microsoft.com/" },
  { title: "Milvus", description: "An open-source vector database built for scalable similarity search and AI application backends.", type: "SOFTWARE", source: "Zilliz", tags: ["vector-database", "ai", "similarity-search", "open-source"], url: "https://milvus.io/" },
  { title: "MongoDB", description: "A popular document-oriented NoSQL database for flexible, scalable data storage.", type: "SOFTWARE", source: "MongoDB Inc.", tags: ["database", "nosql", "document-store", "scalable"], url: "https://www.mongodb.com/" },
  { title: "MySQL", description: "An open-source relational database management system, the world's most popular open-source database.", type: "SOFTWARE", source: "Oracle", tags: ["database", "sql", "relational", "open-source"], url: "https://www.mysql.com/" },
  { title: "Next.js", description: "A React framework for building fast, production-grade web applications with SSR and static generation.", type: "SOFTWARE", source: "Vercel", tags: ["react", "framework", "ssr", "web-development"], url: "https://nextjs.org/" },
  { title: "Node.js", description: "A cross-platform JavaScript runtime built on Chrome's V8 engine for server-side applications.", type: "SOFTWARE", source: "OpenJS Foundation", tags: ["javascript", "runtime", "backend", "server"], url: "https://nodejs.org/" },
  { title: "Nvidia", description: "A multinational technology company that designs GPUs and AI computing platforms powering modern AI.", type: "SOFTWARE", source: "Nvidia", tags: ["gpu", "ai", "hardware", "computing"], url: "https://www.nvidia.com/" },
  { title: "OneNote", description: "A digital note-taking app by Microsoft for organizing notes, drawings, and clippings across devices.", type: "SOFTWARE", source: "Microsoft", tags: ["notes", "productivity", "microsoft", "organization"], url: "https://www.onenote.com/" },
  { title: "OpenAI", description: "An AI research and deployment company behind GPT, DALL-E, and other frontier AI models.", type: "SOFTWARE", source: "OpenAI", tags: ["ai", "research", "llm", "gpt"], url: "https://openai.com/" },
  { title: "Phosphor Icons", description: "A flexible, consistent icon family for interfaces, diagrams, and presentations with multiple weights.", type: "SOFTWARE", source: "Phosphor", tags: ["icons", "design", "ui", "open-source"], url: "https://phosphoricons.com/" },
  { title: "Pinecone", description: "A managed vector database optimized for machine learning applications and semantic search.", type: "SOFTWARE", source: "Pinecone", tags: ["vector-database", "ai", "search", "managed"], url: "https://www.pinecone.io/" },
  { title: "PostHog", description: "An open-source product analytics platform for tracking user behavior, feature flags, and A/B tests.", type: "SOFTWARE", source: "PostHog", tags: ["analytics", "product", "open-source", "tracking"], url: "https://posthog.com/" },
  { title: "PostgreSQL", description: "A powerful, open-source object-relational database known for reliability, extensibility, and SQL compliance.", type: "SOFTWARE", source: "PostgreSQL Global", tags: ["database", "sql", "relational", "open-source"], url: "https://www.postgresql.org/" },
  { title: "Postman", description: "An API platform for building, testing, and documenting APIs with a collaborative workspace.", type: "SOFTWARE", source: "Postman", tags: ["api", "testing", "developer-tools", "documentation"], url: "https://www.postman.com/" },
  { title: "Python", description: "A high-level, general-purpose programming language known for readability and a vast ecosystem of libraries.", type: "SOFTWARE", source: "Python Software Foundation", tags: ["programming", "language", "data-science", "backend"], url: "https://www.python.org/" },
  { title: "Qdrant", description: "A vector similarity search engine and database built for high-performance AI applications.", type: "SOFTWARE", source: "Qdrant", tags: ["vector-database", "ai", "search", "rust"], url: "https://qdrant.tech/" },
  { title: "React", description: "A free, open-source JavaScript library by Meta for building fast, interactive user interfaces.", type: "SOFTWARE", source: "Meta", tags: ["javascript", "ui", "frontend", "library"], url: "https://react.dev/" },
  { title: "Redis", description: "An in-memory data store used as a database, cache, and message broker for ultra-fast performance.", type: "SOFTWARE", source: "Redis Ltd.", tags: ["database", "cache", "in-memory", "fast"], url: "https://redis.io/" },
  { title: "Resend", description: "A modern email API for developers to send transactional emails with excellent deliverability.", type: "SOFTWARE", source: "Resend", tags: ["email", "api", "developer-tools", "transactional"], url: "https://resend.com/" },
  { title: "Sentry", description: "An application monitoring platform for real-time error tracking, performance monitoring, and debugging.", type: "SOFTWARE", source: "Sentry", tags: ["monitoring", "error-tracking", "debugging", "devops"], url: "https://sentry.io/" },
  { title: "Slack", description: "A messaging platform for teams featuring channels, direct messages, integrations, and workflow automation.", type: "SOFTWARE", source: "Salesforce", tags: ["communication", "messaging", "team", "productivity"], url: "https://slack.com/" },
  { title: "Spotify", description: "The world's most popular audio streaming service with millions of songs, podcasts, and audiobooks.", type: "SOFTWARE", source: "Spotify AB", tags: ["music", "streaming", "podcasts", "audio"], url: "https://www.spotify.com/" },
  { title: "Stripe", description: "A payment processing platform powering online payments for millions of internet businesses worldwide.", type: "SOFTWARE", source: "Stripe", tags: ["payments", "fintech", "api", "commerce"], url: "https://stripe.com/" },
  { title: "Supabase", description: "An open-source Firebase alternative providing a Postgres database, auth, storage, and real-time subscriptions.", type: "SOFTWARE", source: "Supabase", tags: ["database", "backend", "open-source", "firebase-alternative"], url: "https://supabase.com/" },
  { title: "Terraform", description: "An infrastructure as code tool by HashiCorp for provisioning and managing cloud resources declaratively.", type: "SOFTWARE", source: "HashiCorp", tags: ["iac", "devops", "cloud", "infrastructure"], url: "https://www.terraform.io/" },
  { title: "Upstash", description: "A serverless data platform providing Redis and Kafka as a service with per-request pricing.", type: "SOFTWARE", source: "Upstash", tags: ["serverless", "redis", "kafka", "database"], url: "https://upstash.com/" },
  { title: "Vercel", description: "A cloud platform for deploying and hosting frontend apps and serverless functions, creators of Next.js.", type: "SOFTWARE", source: "Vercel", tags: ["hosting", "deployment", "frontend", "serverless"], url: "https://vercel.com/" },
  { title: "Visual Studio Code", description: "A free, powerful source-code editor by Microsoft with rich extensions, debugging, and Git integration.", type: "SOFTWARE", source: "Microsoft", tags: ["code-editor", "ide", "developer-tools", "extensions"], url: "https://code.visualstudio.com/" },
  { title: "Weaviate", description: "An open-source vector database for building semantic search and AI-native applications at scale.", type: "SOFTWARE", source: "Weaviate", tags: ["vector-database", "ai", "semantic-search", "open-source"], url: "https://weaviate.io/" },
  { title: "WhatsApp", description: "A cross-platform instant messaging service with end-to-end encryption for billions of users worldwide.", type: "SOFTWARE", source: "Meta", tags: ["messaging", "communication", "encrypted", "mobile"], url: "https://www.whatsapp.com/" },
  { title: "YouTube", description: "The world's largest video sharing platform for watching, uploading, and sharing video content.", type: "SOFTWARE", source: "Google", tags: ["video", "streaming", "social-media", "content"], url: "https://www.youtube.com/" },
  { title: "Chrome", description: "Google's cross-platform web browser, the most popular browser worldwide with V8 JavaScript engine.", type: "SOFTWARE", source: "Google", tags: ["browser", "web", "google", "v8"], url: "https://www.google.com/chrome/" },
  { title: "shadcn/ui", description: "A collection of re-usable, beautifully designed components built using Radix UI and Tailwind CSS.", type: "SOFTWARE", source: "shadcn", tags: ["ui", "components", "react", "tailwind"], url: "https://ui.shadcn.com/" },
];

// ── Seed function ────────────────────────────────────────────────────
async function seed() {
  const allArtifacts = [
    ...BOOKS,
    ...GAMES,
    ...MOVIES,
    ...MUSIC,
    ...SHOPPING,
    ...LINKS,
    ...TOOLS,
  ];

  console.log(`\n🌱 Seeding ${allArtifacts.length} artifacts into Firestore...\n`);

  const BATCH_SIZE = 500; // Firestore batch write limit
  let batchCount = 0;
  let totalWritten = 0;
  let batch = db.batch();

  for (const artifact of allArtifacts) {
    const docRef = db.collection("artifacts").doc();
    batch.set(docRef, {
      ...artifact,
      createdAt: Timestamp.now(),
    });

    batchCount++;
    totalWritten++;

    if (batchCount === BATCH_SIZE) {
      await batch.commit();
      console.log(`  ✅ Committed batch (${totalWritten} artifacts so far)`);
      batch = db.batch();
      batchCount = 0;
    }
  }

  // Commit remaining
  if (batchCount > 0) {
    await batch.commit();
    console.log(`  ✅ Committed final batch`);
  }

  console.log(`\n🎉 Successfully seeded ${totalWritten} artifacts!\n`);

  // Summary by type
  const typeCounts = {};
  for (const a of allArtifacts) {
    typeCounts[a.type] = (typeCounts[a.type] || 0) + 1;
  }
  console.log("📊 Breakdown by type:");
  for (const [type, count] of Object.entries(typeCounts).sort()) {
    console.log(`   ${type}: ${count}`);
  }
  console.log("");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
