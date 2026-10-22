# Pitch GM — gameplay systems (October 2026)

This repository is a standalone, offline-first fictional soccer franchise simulator. The game saves to the current browser's localStorage; it does not sync across devices.

## Career and board
Board trust starts at 72. Wins increase trust by 5, draws decrease it by 1, losses decrease it by 9. A top-four finish increases trust by 10; missing the objective decreases it by 18. Winning the championship increases trust by 25. Trust at 15 or below, or seven consecutive defeats, causes dismissal. The manager can accept an offer at another club.

## Seasons
Predraft requires using both picks and having at least 11 healthy players. Fourteen matchdays comprise home-and-away fixtures among eight clubs. Top four qualify for the postseason knockout. Completing the final opens the season-complete state; advancing triggers offseason processing.

## Player lifecycle
Players age one year per completed season. Under-26 players can improve up to four overall points per year, capped at potential; ages 26–29 up to two points. Players over 30 can decline by up to two overall points, or four after age 35, with a 40 overall floor. Retirement is checked at the offseason after aging: ages 33–34: 8%, 35–36: 24%, 37–38: 48%, 39–40: 80%, 41+: 100%. Retirees leave the roster permanently and are recorded in the Retirement Hall. Expired contracts move players into free agency, not retirement.

## Transfers
Player values use overall rating, remaining potential, age, and contract years. Buying bids 112% of valuation; selling returns 85%. Selling is blocked when it would leave fewer than 11 players or remove the last player at a position. Clubs may reject bids depending on value, player age, and the buyer's position depth. A £1.1m/year squad wage cap and 30-player roster limit apply to purchases. Transfers are closed during the postseason. Transfer history records completed purchases and sales. Players with up to two contract years remaining can be renewed for a bonus and a 15% wage increase.

## Tactics and availability
Balanced, Attacking, and Defensive affect team strength and/or scoring. Attacking increases injury risk. Injured players cannot be selected in the starting lineup; they recover across matchdays. Medical facilities lower injury risk.

## Current limitations
The transfer market uses generated NPC players rather than persistent, fully simulated rival club rosters; transfer acceptance is probabilistic. Match outcomes are simplified rather than event-by-event simulations. Save data is local to one browser. The original Bolt-built Pitch GM was not present in this GitHub repository, so this remains a new, evolving implementation.
