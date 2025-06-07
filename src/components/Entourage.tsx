import React, { useState, useEffect, useRef } from 'react';

// Define the type for a single checklist item
interface ChecklistItem {
  id: string;
  text: string;
}

// Define the type for a checklist category
interface ChecklistCategory {
  title: string;
  items: ChecklistItem[];
}

// Your checklist data here (same as you provided)
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
  // ... (rest of your checklistData categories)
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
    title: 'Principal Sponsor (Mr.)',
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
    title: 'Principal Sponsor (Mrs.)',
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
    items: [{ id: 'best_man_1', text: 'John Carlo Pereja' }],
  },
  {
    title: 'Maid of Honor',
    items: [{ id: 'moh_1', text: 'Ruffa Mae Cruz' }],
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
    items: [{ id: 'ring_bearer_1', text: 'Ethan Miguel Aldea' }],
  },
  {
    title: 'Arrhae Bearer',
    items: [{ id: 'arrhae_bearer_1', text: 'Lance Aiden Brosas' }],
  },
  {
    title: 'Bible Bearer',
    items: [{ id: 'bible_bearer_1', text: 'Aedan James Brosas' }],
  },
  {
    title: 'Flower Girl',
    items: [
      { id: 'flower_girl_1', text: 'Phoebe Azanza' },
      { id: 'flower_girl_2', text: 'Maria Toyugan' },
    ],
  },
];

const WeddingChecklist: React.FC = () => {
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    checklistData.forEach((category) => {
      category.items.forEach((item) => {
        initialState[item.id] = false;
      });
    });
    return initialState;
  });

  // Track which items have been animated (visible)
  const [visibleItems, setVisibleItems] = useState<Record<string, boolean>>({});
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});

  const handleToggleComplete = (itemId: string) => {
    setCompletedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-id');
          if (entry.isIntersecting && id) {
            setVisibleItems((prev) => ({ ...prev, [id]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(itemRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="scroll-wrapper">
      <div className="checklist-container">
        {/* Program Section */}
        <div className="program-box">
          <h1 className="main-title-wedding">Program</h1>
          <ul className="category-items program-items">
            {checklistData
              .find((cat) => cat.title === 'Program')
              ?.items.map((item) => (
                <li
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[item.id] = el;
                  }}
                  data-id={item.id}
                  className={`checklist-item ${
                    completedItems[item.id] ? 'completed' : ''
                  } ${visibleItems[item.id] ? 'slide-in-left' : ''}`}
                  onClick={() => handleToggleComplete(item.id)}
                >
                  <span className="item-text">{item.text}</span>
                </li>
              ))}
          </ul>
        </div>

        {/* Entourage Section */}
        <div className="entourage-box">
          <h1 className="main-title-wedding">Entourage</h1>

          {/* Parents Section */}
          <div className="checklist-grid two-column-section">
            {checklistData
              .filter((category) => category.title.includes('Parents of the'))
              .map((category) => (
                <div key={category.title} className="category-column">
                  <div className="category-section2">
                    <h3 className="category-title">{category.title}</h3>
                    <ul className="category-items">
                      {category.items.map((item) => (
                        <li
                          key={item.id}
                          ref={(el) => {
                            itemRefs.current[item.id] = el;
                          }}
                          data-id={item.id}
                          className={`checklist-item ${
                            completedItems[item.id] ? 'completed' : ''
                          } ${visibleItems[item.id] ? 'slide-in-left' : ''}`}
                          onClick={() => handleToggleComplete(item.id)}
                        >
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
              {checklistData
                .filter((category) => category.title.includes('Principal Sponsor'))
                .map((category) => (
                  <div key={category.title} className="category-column">
                    <div className="category-section2">
                      <ul className="category-items">
                        {category.items.map((item) => (
                          <li
                            key={item.id}
                            ref={(el) => {
                              itemRefs.current[item.id] = el;
                            }}
                            data-id={item.id}
                            className={`checklist-item ${
                              completedItems[item.id] ? 'completed' : ''
                            } ${visibleItems[item.id] ? 'slide-in-left' : ''}`}
                            onClick={() => handleToggleComplete(item.id)}
                          >
                            <span className="item-text">{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <hr className="section-separator" />

          {/* Best Man & Maid of Honor */}
          <div className="best-man-maid-section checklist-grid two-column-section">
            {checklistData
              .filter(
                (category) =>
                  category.title === 'Best Man' || category.title === 'Maid of Honor'
              )
              .map((category) => (
                <div key={category.title} className="category-column">
                  <div className="category-section2">
                    <h3 className="category-title">{category.title}</h3>
                    <ul className="category-items">
                      {category.items.map((item) => (
                        <li
                          key={item.id}
                          ref={(el) => {
                            itemRefs.current[item.id] = el;
                          }}
                          data-id={item.id}
                          className={`checklist-item ${
                            completedItems[item.id] ? 'completed' : ''
                          } ${visibleItems[item.id] ? 'slide-in-left' : ''}`}
                          onClick={() => handleToggleComplete(item.id)}
                        >
                          <span className="item-text">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>

          <hr className="section-separator" />

          {/* Secondary Sponsor, Groomsmen, Bridesmaids, Ring Bearer, Arrhae Bearer, Bible Bearer, Flower Girl */}
          <div className="checklist-grid multi-column-section">
            {checklistData
              .filter(
                (category) =>
                  [
                    'Secondary Sponsor (Mr.)',
                    'Secondary Sponsor (Ms.)',
                    'Groomsmen',
                    'Bridesmaid',
                    'Ring Bearer',
                    'Arrhae Bearer',
                    'Bible Bearer',
                    'Flower Girl',
                  ].includes(category.title)
              )
              .map((category) => (
                <div key={category.title} className="category-column">
                  <div className="category-section2">
                    <h3 className="category-title">{category.title}</h3>
                    <ul className="category-items">
                      {category.items.map((item) => (
                        <li
                          key={item.id}
                          ref={(el) => {
                            itemRefs.current[item.id] = el;
                          }}
                          data-id={item.id}
                          className={`checklist-item ${
                            completedItems[item.id] ? 'completed' : ''
                          } ${visibleItems[item.id] ? 'slide-in-left' : ''}`}
                          onClick={() => handleToggleComplete(item.id)}
                        >
                          <span className="item-text">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* CSS styles included for slide-in and completed effect */}
      
    </div>
  );
};

export default WeddingChecklist;
