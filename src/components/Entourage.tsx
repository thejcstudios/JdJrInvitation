import React, { useState } from 'react';

// Define the type for a single checklist item
interface ChecklistItem {
  id: string; // Unique identifier for the item
  text: string; // The description of the checklist item
}

// Define the type for a checklist category, which contains a title and an array of items
interface ChecklistCategory {
  title: string; // The title of the checklist category (e.g., "SETTING THE FOUNDATION")
  items: ChecklistItem[]; // An array of items within this category
}

// Data structure holding all the checklist categories and their items.
// This is hardcoded for demonstration based on the provided image.
const checklistData: ChecklistCategory[] = [
  {
    title: 'Program',
    items: [
      { id: 'program_1', text: 'Breakfast and Prep - 6:30am' },
      { id: 'program_2', text: 'Ceremony - 2:30pm' },
      { id: 'program_3', text: 'Post Ceremony Photos - 4:00pm' },
      { id: 'program_4', text: 'Cocktail Time - 5:00pm' },
      { id: 'program_5', text: 'Reception Program - 6:00pm' },
      { id: 'program_6', text: 'Dinner - 7:00pm' },
      { id: 'program_7', text: 'Send-Off - 9:00pm' },
    ],
  },
  {
    title: 'Parents of the Groom',
    items: [
      { id: 'groom_parent_1', text: 'Mrs. Concepcion Deriquito' },
      { id: 'groom_parent_2', text: 'Mr. Reynaldo Deriquito' },
    ],
  },
  {
    title: 'Parents of the Bride',
    items: [
      { id: 'bride_parent_1', text: 'Mrs. Marivic Datiles' },
      { id: 'bride_parent_2', text: 'Mr. Joseph Datiles' },
    ],
  },
  {
    title: 'Principal Sponsor (Mr.)', // Split for column arrangement
    items: [
      { id: 'sponsor_mr_1', text: 'Mr. Florecio Parian' },
      { id: 'sponsor_mr_2', text: 'Mr. Nestor Malabanan' },
      { id: 'sponsor_mr_3', text: 'Mr. Benjamin III Azanza' },
      { id: 'sponsor_mr_4', text: 'Mr. Richie Dacanay' },
      { id: 'sponsor_mr_5', text: 'Mr. David Comendador' },
      { id: 'sponsor_mr_6', text: 'Mr. Rizaldy Datiles' },
      { id: 'sponsor_mr_7', text: 'Mr. Lyndon Nosce' },
      { id: 'sponsor_mr_8', text: 'Mr. Eric Barairo' },
    ],
  },
  {
    title: 'Principal Sponsor (Mrs.)', // Split for column arrangement
    items: [
      { id: 'sponsor_mrs_1', text: 'Mrs. Lorena Parian' },
      { id: 'sponsor_mrs_2', text: 'Mrs. Remedios Malaban' },
      { id: 'sponsor_mrs_3', text: 'Mrs. Winnie Azanza' },
      { id: 'sponsor_mrs_4', text: 'Mrs. Abegail Dacanay' },
      { id: 'sponsor_mrs_5', text: 'Mrs. Maricel Comendador' },
      { id: 'sponsor_mrs_6', text: 'Ms. Annabelle Javier' },
      { id: 'sponsor_mrs_7', text: 'Mrs. Creselda Nosce' },
      { id: 'sponsor_mrs_8', text: 'Mrs. Shiela Barairo' },
    ],
  },
  {
    title: 'Best Man',
    items: [
      { id: 'best_man_1', text: 'John Carlo Pereja' },
    ],
  },
  {
    title: 'Maid of Honor',
    items: [
      { id: 'moh_1', text: 'Ruffa Mae Cruz' },
    ],
  },
  {
    title: 'Secondary Sponsor (Mr.)',
    items: [
      { id: 'secondary_mr_1', text: 'McRonald Olivar' },
      { id: 'secondary_mr_2', text: 'Jomari Echavarre' },
      { id: 'secondary_mr_3', text: 'Emil Magnaye' },
    ],
  },
  {
    title: 'Secondary Sponsor (Ms.)',
    items: [
      { id: 'secondary_ms_1', text: 'Noreen Bianca Lanado' },
      { id: 'secondary_ms_2', text: 'Verginia Adornado' },
      { id: 'secondary_ms_3', text: 'Rizza Madara' },
    ],
  },
  {
    title: 'Groomsmen',
    items: [
      { id: 'groomsmen_1', text: 'Lawrence Brosas' },
      { id: 'groomsmen_2', text: 'Kevin Trillana' },
      { id: 'groomsmen_3', text: 'Maynard Siquijor' },
    ],
  },
  {
    title: 'Bridesmaid',
    items: [
      { id: 'bridesmaid_1', text: 'Angelu Gapan' },
      { id: 'bridesmaid_2', text: 'Elvie Carlos' },
      { id: 'bridesmaid_3', text: 'Genalyn Adelito' },
      { id: 'bridesmaid_4', text: 'Janine Talla' },
      { id: 'bridesmaid_5', text: 'Shella Cordial' },
    ],
  },
  {
    title: 'Ring Bearer',
    items: [
      { id: 'ring_bearer_1', text: 'Ethan Miguel Aldea' },
    ],
  },
  {
    title: 'Arrhae Bearer',
    items: [
      { id: 'arrhae_bearer_1', text: 'Lance Aiden Brosas' },
    ],
  },
  {
    title: 'Bible Bearer',
    items: [
      { id: 'bible_bearer_1', text: 'Aedan James Brosas' },
    ],
  },
  {
    title: 'Flower Girl',
    items: [
      { id: 'flower_girl_1', text: 'Phoebe Azanza' },
      { id: 'flower_girl_2', text: 'Maria Toyugan' },
    ],
  },
];

/**
 * WeddingChecklist Component
 * Displays a customizable wedding checklist with categories and items.
 * Users can toggle the completion status of each item.
 */
const WeddingChecklist: React.FC = () => {
  // State to manage the completion status of each checklist item.
  // The key is the item's ID, and the value is a boolean (true if completed, false otherwise).
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>(() => {
    // Initialize all items as not completed.
    const initialState: Record<string, boolean> = {};
    checklistData.forEach(category => {
      category.items.forEach(item => {
        initialState[item.id] = false;
      });
    });
    return initialState;
  });

  /**
   * Toggles the completion status of a given checklist item.
   * @param itemId The unique ID of the item to toggle.
   */
  const handleToggleComplete = (itemId: string) => {
    setCompletedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId], // Toggle the boolean value for the specific item
    }));
  };

  return (
    <div className="checklist-container">
      {/* Main title section */}
      <h1 className="main-title-wedding">Entourage</h1>
      <h2 className="main-title-checklist"> and Program</h2>

      {/* Program Section */}
      <div className="program-section">
        <h3 className="category-title">Program</h3>
        <ul className="category-items program-items">
          {checklistData.find(cat => cat.title === 'Program')?.items.map(item => (
            <li
              key={item.id}
              className={`checklist-item ${completedItems[item.id] ? 'completed' : ''}`}
              onClick={() => handleToggleComplete(item.id)}
            >
              {/* Removed Heart Icon SVG */}
              <span className="item-text">{item.text}</span>
            </li>
          ))}
        </ul>
        <hr className="section-separator" />
      </div>

      {/* Parents Section */}
      <div className="checklist-grid two-column-section">
        {checklistData.filter(category => category.title.includes('Parents of the')).map(category => (
          <div key={category.title} className="category-column">
            <div className="category-section">
              <h3 className="category-title">{category.title}</h3>
              <ul className="category-items">
                {category.items.map(item => (
                  <li
                    key={item.id}
                    className={`checklist-item ${completedItems[item.id] ? 'completed' : ''}`}
                    onClick={() => handleToggleComplete(item.id)}
                  >
                    {/* Removed Heart Icon SVG */}
                    <span className="item-text">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <hr className="section-separator" />

      {/* Principal Sponsor Section */}
      <div className="principal-sponsor-section">
        <h3 className="category-title centered-title">Principal Sponsor</h3>
        <div className="checklist-grid two-column-section">
          {checklistData.filter(category => category.title.includes('Principal Sponsor')).map(category => (
            <div key={category.title} className="category-column">
              <ul className="category-items">
                {category.items.map(item => (
                  <li
                    key={item.id}
                    className={`checklist-item ${completedItems[item.id] ? 'completed' : ''}`}
                    onClick={() => handleToggleComplete(item.id)}
                  >
                    {/* Removed Heart Icon SVG */}
                    <span className="item-text">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <hr className="section-separator" />
      </div>


      {/* Remaining Categories in 2 Columns */}
      <div className="checklist-grid two-column-section">
        {checklistData.filter(category =>
          !['Program', 'Parents of the Groom', 'Parents of the Bride', 'Principal Sponsor (Mr.)', 'Principal Sponsor (Mrs.)'].includes(category.title)
        ).reduce((acc: ChecklistCategory[][], current, index) => {
          if (index % 2 === 0) {
            acc.push([current]);
          } else {
            acc[acc.length - 1].push(current);
          }
          return acc;
        }, []).map((pair, index) => (
          <React.Fragment key={index}>
            <div className="category-column">
              <div className="category-section">
                <h3 className="category-title">{pair[0].title}</h3>
                <ul className="category-items">
                  {pair[0].items.map(item => (
                    <li
                      key={item.id}
                      className={`checklist-item ${completedItems[item.id] ? 'completed' : ''}`}
                      onClick={() => handleToggleComplete(item.id)}
                    >
                      {/* Removed Heart Icon SVG */}
                      <span className="item-text">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {pair[1] && (
              <div className="category-column">
                <div className="category-section">
                  <h3 className="category-title">{pair[1].title}</h3>
                  <ul className="category-items">
                    {pair[1].items.map(item => (
                      <li
                        key={item.id}
                        className={`checklist-item ${completedItems[item.id] ? 'completed' : ''}`}
                        onClick={() => handleToggleComplete(item.id)}
                      >
                        {/* Removed Heart Icon SVG */}
                        <span className="item-text">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Concluding message */}
      <p className="concluding-message">
        Plan with love, cherish every moment,
        <br />
        and create a beautiful beginning to your forever.
      </p>
    </div>
  );
};

/**
 * App Component
 * The main application component that renders the WeddingChecklist.
 * Includes all custom CSS styles.
 */
const Entourage: React.FC = () => {
  return (
    <>
      <div className="app-container">
        <WeddingChecklist />
      </div>
    </>
  );
};

export default Entourage;