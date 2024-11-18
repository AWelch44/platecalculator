def calculate_plates(target_weight, bar_weight=45):
    """
    Calculate the plates needed on each side of a barbell to reach a target weight.
    
    Parameters:
    target_weight (float): The total weight goal in pounds
    bar_weight (float): Weight of the barbell in pounds (default 45)
    
    Returns:
    dict: Dictionary containing the number of each plate needed per side
    """
    # Standard plate weights in pounds
    available_plates = [45, 35, 25, 10, 5, 2.5]
    
    # Calculate weight needed on each side
    weight_per_side = (target_weight - bar_weight) / 2
    
    if weight_per_side < 0:
        return "Target weight must be greater than bar weight"
    
    # Initialize result dictionary
    plates_needed = {str(plate): 0 for plate in available_plates}
    
    # Calculate plates needed
    remaining_weight = weight_per_side
    for plate in available_plates:
        while remaining_weight >= plate:
            plates_needed[str(plate)] += 1
            remaining_weight -= plate
    
    # Check if we couldn't make exact weight
    if remaining_weight > 0:
        return f"Warning: Could not reach exact weight. Closest possible weight is {target_weight - (remaining_weight * 2)} lbs"
    
    # Format output for plates needed per side
    result = "Plates needed per side:\n"
    for plate, count in plates_needed.items():
        if count > 0:
            result += f"{count}x {plate}lb plates\n"
            
    return result

# Example usage
def main():
    while True:
        try:
            target = float(input("Enter target weight (lbs): "))
            bar_weight = float(input("Enter bar weight (default 45 lbs): ") or "45")
            print("\n" + calculate_plates(target, bar_weight))
        except ValueError:
            print("Please enter valid numbers")
        
        if input("\nCalculate another weight? (y/n): ").lower() != 'y':
            break

if __name__ == "__main__":
    main()
