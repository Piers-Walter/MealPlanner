import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
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
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { api } from "~/utils/api";

const Ingredients = () => {
  const {
    data: allIngredients,
    isLoading,
    refetch: refetchIngredients,
  } = api.ingredient.getAll.useQuery();

  const [open, setOpen] = useState(false);
  const [ingredientName, setIngredientName] = useState("");

  const addIngredientMutation = api.ingredient.add.useMutation({
    onSuccess: () => {
      refetchIngredients();
    },
  });

  const addIngredient = (ingredientName: string) => {
    addIngredientMutation.mutate(ingredientName);
  };

  return (
    <>
      <div className="flex w-full flex-col items-center pt-5">
        <Card className="p-2" variant="gradient" color="blue">
          {isLoading ? (
            <>
              <div className="flex flex-col items-center py-5">
                <Spinner />
              </div>
            </>
          ) : (
            <>
              <div className="flex w-full justify-between pl-5 pr-3 pt-2">
                <Typography variant="lead">Ingredients</Typography>
                <IconButton
                  variant="gradient"
                  size="sm"
                  className="rounded-full"
                  color="yellow"
                  onClick={() => setOpen(true)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </IconButton>
              </div>
              <List>
                {allIngredients?.map((ingredient) => (
                  <ListItem className="py-1 text-gray-300">
                    <Typography>{ingredient.name}</Typography>
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
      <Dialog open={open} handler={() => setOpen(!open)}>
        <DialogHeader>Add Ingredient</DialogHeader>
        <DialogBody>
          <Input
            label="Name"
            value={ingredientName}
            onChange={(e) => setIngredientName(e.target.value)}
          />
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
              addIngredient(ingredientName);
              setOpen(false);
            }}
            disabled={
              ingredientName.trim() == "" ||
              allIngredients
                ?.map((item) => item.name.toLocaleLowerCase())
                .includes(ingredientName.toLocaleLowerCase().trim())
            }
          >
            <span>Add</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Ingredients;
