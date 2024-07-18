import { ReactElement } from "react";

import styles from "./Main.module.scss";

export default function Main({ children }: { children?: ReactElement }) {
  return children ? (
    <section className={styles.main}>{children}</section>
  ) : (
    <section className={styles.main}>
      <h1>Welcome to Travel Helper!</h1>
      <p>
        Ready to embark on your next adventure? Whether you're planning a
        weekend getaway or a month-long journey, Travel Helper is here to help
        you create the perfect travel itinerary.
      </p>

      <h2>What can you do with Travel Helper?</h2>
      <ul>
        <li>
          <strong>Create Custom Itineraries:</strong> Design your travel routes
          directly on the map. Choose your destinations, plan your stops, and
          optimize your travel experience.
        </li>
        <li>
          <strong>Find the Best Tickets:</strong> Use our integrated Telegram
          bots to search for the best deals on flights, trains, and buses. Get
          real-time updates and book your tickets effortlessly.
        </li>
        <li>
          <strong>Discover New Destinations:</strong> Explore popular travel
          spots, hidden gems, and local attractions. Get recommendations based
          on your interests and preferences.
        </li>
      </ul>

      <p>Start exploring now and make your next trip unforgettable!</p>
    </section>
  );
}

