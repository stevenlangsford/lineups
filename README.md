#Initial design notes#

There is a collection of 86 lineups of 6 faces each. Save three and use 80 of them. (at random?)

Each participant: logs in with their unique key.
Demographics: record sex, age, normal vision? (Studytime, testtime)

*Study phase*
See 40 faces. Presented as next button->1/2 sec gap -> face presented for EITHER 1/4 sec or 1 sec (20 each for each participant) -> next button

Record:
participantID,trialnumber, photoID, lineupID, exposureDuration, intertrialTime 

<<1 Day gap>>

*Test Phase*
Condition 1: present/absent -> confidence
Condition 2: Which of these faces is most likely to be one you have seen before?
Condition 3: If you have seen one of these faces before, please indicate which one, otherwise hit 'not present'

Response and lineup are visible at the same time, followed by confidence rating after response is made.
Confidence rating is a 5 point scale: guess, possible,probable, almost certain, certain.

Record:
ParticipantID, trialnumber, lineupID, targnumber, condition, response, confidencerating, exposuretime

Participants to be paid via amazon gift voucher?