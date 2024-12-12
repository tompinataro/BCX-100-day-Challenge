import React from 'react';
import './AboutPage.css/'; 

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="grid">
      <div>
        <p>The BCX Challenge is more than a 100-day journey; it’s a commitment to yourself, your growth, and your confidence. BCX is about building intentional habits that align with your values and creating a lifestyle that reflects the best version of you. Every step you take is an opportunity to embrace your unique strength, cultivate balance, and thrive with the support of a like-minded community.

        </p>
        <p>In BCX, you’ll master two powerful phases: Build and Consistency.
          The steps within each phase build on each other, encouraging progress over perfection and helping you cultivate lasting habits.
        </p>
         <p>Phase 1: Build (50 Days)
          This phase is all about laying a strong foundation through intentional habits. The user will focus on mastering one habit at a time, each for 10 consecutive days, before moving to the next. If a user misses a day, they’ll reset that step, showing resilience and embracing ownership of their journey.
          </p>
         <p>Hydrate: Commit to drinking 1 gallon of water daily to refresh your body and boost your energy.
         </p>
         <p> Grow: Add 15 minutes of personal development daily to strengthen your mindset and unlock new perspectives.
         </p>
         <p> Move: Stay active with 10,000 steps daily (and one rest day each week), embracing movement as a celebration of your strength.
         </p>
         <p>Focus: Dedicate 5 minutes to guided meditation daily, grounding yourself with compassion and clarity.
         </p>
         <p>Nourish: Follow a meal plan that supports your goals, fueling your body with balance and intention. Avoid alcohol and refined sugar. Teach the Plan Twice Method.
         </p>
         <p>You will progress step by step, cultivating consistency and confidence as they go. Each day is a chance to show up for yourself and lean into your inner strength.
          </p>

          <p>Phase 2: Consistency (50 Days)
          Once you’ve built their foundation, it’s time to strengthen and sustain it. In the Consistency Phase, they’ll continue all the habits from Phase 1 while incorporating an additional practice that emphasizes balance and mindfulness:
          </p>

          <p>Unplug and Done: Unplug means when your evening starts, your phone use stops. Done means after dinner, no snacking. Use this time to connect, reflect, and create harmony in your life.
          This phase celebrates their resilience and vibrancy as they continue showing up for yourself every day. With the support of the BCX community, you’ll thrive in their unique journey while uplifting others on theirs.
          </p>

          <p>Why BCX?
          At Body Confidence, we believe in the power of transformation through empowerment, consistency, and self-compassion. This challenge is designed to help you build a vibrant, sustainable lifestyle that reflects your values. Together, we’ll celebrate progress over perfection, reminding you that every step forward matters.
          Let’s build, grow, and thrive—together. #BCX
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
