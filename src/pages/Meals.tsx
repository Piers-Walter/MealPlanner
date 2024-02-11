import {
  faCarrot,
  faPlus,
  faSearch,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Button,
  Card,
  IconButton,
  List,
  ListItem,
  ListItemSuffix,
  Spinner,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Chip,
  Typography,
  ListItemPrefix,
  Checkbox,
} from "@material-tailwind/react";
import { Ingredient } from "@prisma/client";
import { useState } from "react";
import { api } from "~/utils/api";

const Ingredients = () => {
  const {
    data: allMeals,
    isLoading,
    refetch: refetchMeals,
  } = api.meal.getAll.useQuery();

  const { data: allIngredients, isLoading: ingredientsLoading } =
    api.ingredient.getAll.useQuery();

  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    [],
  );

  const [ingredientSearch, setIngredientSearch] = useState("");

  const [open, setOpen] = useState(true);

  return (
    <>
      <div className="flex w-full flex-col items-center pt-5">
        <Card className="p-2" variant="gradient" color="green">
          {isLoading ? (
            <>
              <div className="flex flex-col items-center py-5">
                <Spinner />
              </div>
            </>
          ) : (
            <>
              <div className="flex w-full justify-between pl-5 pr-2 pt-2">
                <Typography variant="lead">Meals</Typography>
                <IconButton
                  variant="gradient"
                  size="sm"
                  className="rounded-full"
                  color="orange"
                  onClick={() => setOpen(true)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </IconButton>
              </div>
              <List>
                {allMeals?.map((meal) => (
                  <ListItem className="py-1 pl-4 pr-1 text-gray-300">
                    <Typography>{meal.name}</Typography>
                    <Chip
                      size="sm"
                      variant="gradient"
                      color="orange"
                      className="ml-2 rounded-full"
                      value={
                        <>
                          {
                            <FontAwesomeIcon
                              size="sm"
                              icon={faCarrot}
                              className="pr-1"
                            />
                          }
                          <Typography variant="small" className="inline">
                            {meal.ingredients.length}
                          </Typography>
                        </>
                      }
                    />
                    <ListItemSuffix>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </ListItemSuffix>
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Card>
      </div>
      <Dialog open={open} handler={() => setOpen(!open)} className="">
        <DialogHeader>Add Meal</DialogHeader>
        <DialogBody>
          <Input
            label="Ingredients"
            icon={<FontAwesomeIcon icon={faSearch} />}
            onChange={(e) => {
              setIngredientSearch(e.target.value);
            }}
          />
          <div className="max-h-20 min-h-20 overflow-scroll">
            {allIngredients
              ?.filter((ingredient) =>
                ingredient.name
                  .toLocaleLowerCase()
                  .includes(ingredientSearch.toLocaleLowerCase()),
              )
              .map((ingredient) => <p>{ingredient.name}</p>)}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setOpen(false)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              setOpen(false);
            }}
          >
            <span>Add</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Ingredients;
