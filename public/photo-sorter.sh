#!/bin/bash

# RUN THIS in after naming edited photos and putting them in the 'photos' directory. be sure to 'cd content' from the base project directory.
### REMEMBER TO SUDO HUGO AFTER OR IT WILL NOT BE REFLECTED IN PUBLIC

# Directory containing the photos
base_dir="photos"

# Function to determine the season based on the month and year
get_season() {
    month=$((10#$1))  # Force month to be treated as a base-10 integer
    year=$2
    if (( month == 12 || month <= 3 )); then
        echo "winter $year"
    elif (( month >= 4 && month <= 6 )); then
        echo "spring $year"
    elif (( month >= 7 && month <= 8 )); then
        if (( month == 8 )); then
            if (( $(date +%d) <= 15 )); then
                echo "summer $year"
            else
                echo "fall $year"
            fi
        else
            echo "summer $year"
        fi
    elif (( month >= 9 && month <= 11 )); then
        echo "fall $year"
    fi
}

# Iterate over all image files in the photos directory (no subdirectories)
find "$base_dir" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r file; do
    # Extract the modified date from the photo metadata
    date_taken=$(exiftool -d "%Y-%m-%d" -FileModifyDate -s -s -s "$file" 2>/dev/null)
    if [[ $? -ne 0 || -z "$date_taken" ]]; then
        echo "Error or no date found for file: $file"
        continue
    fi

    # Get the year, month, and day from the date
    year=$(echo "$date_taken" | cut -d '-' -f 1)
    month=$(echo "$date_taken" | cut -d '-' -f 2 | sed 's/^0//')  # Remove leading zero
    day=$(echo "$date_taken" | cut -d '-' -f 3)

    # Determine the season directory
    season_dir=$(get_season "$month" "$year")
   
    # Create the season directory if it doesn't exist
    mkdir -p "$base_dir/$season_dir"

    # Extract the file name without extension
    filename=$(basename "$file")
    filename_no_ext="${filename%.*}"
   
    # Create a new directory for the image inside the seasonal directory
    output_dir="$base_dir/$season_dir/$filename_no_ext"
    mkdir -p "$output_dir"

    # Copy the original image to the new directory
    cp "$file" "$output_dir/"

    # Create the markdown file with the specified format
    md_file="$output_dir/index.md"
    echo '+++' > "$md_file"
    echo "image=\"$filename\"" >> "$md_file"
    echo "date=\"$date_taken\"" >> "$md_file"
    echo "title=\"$filename_no_ext\"" >> "$md_file"
    echo 'type="gallery"' >> "$md_file"
    echo '+++' >> "$md_file"

    # Remove the original file
    #rm "$file"
   
    echo "Processed and moved: $file to $output_dir"
done