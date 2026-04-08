export function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
    return(
        <>
        <div className="flex flex-wrap gap-4 justify-center mb-8">
            <button
            onClick={() => onSelectCategory('All')}
            className={`px-6 py-2 rounded-full transition cursor-pointer
                 ${selectedCategory === 'All' ? 'bg-green-600 text-white' 
                    : 'bg-white text-gray-700 border hover:border-green-600'}`}
            >
                All
            </button>
            {/* categories button */}
           {categories.map( category => (
            <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-6 py-2 rounded-full transition cursor-pointer
                ${ selectedCategory === category ? 'bg-green-600 text-white' 
                    : 'bg-white text-gray-700 border hover:border-green-600' }`}
            >
                {category}
            </button>
           )
           )}
        </div>
    </>
    )
}