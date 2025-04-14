
import React from 'react';

const NoMenuItems: React.FC = () => {
  return (
    <div className="text-center py-10">
      <h3 className="text-xl font-semibold mb-2">No menu items found</h3>
      <p className="text-gray-500">
        Try adjusting your search or browse a different category
      </p>
    </div>
  );
};

export default NoMenuItems;
