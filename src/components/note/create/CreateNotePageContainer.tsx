"use client"

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  CreateNoteFormData,
  createNoteSchema,
} from "@/libs/validations/createNote.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import CreateNoteHeader from "./CreateNoteHeader";

export default function CreateNotePageContainer() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // const {
  //   formData,
  //   tags,
  //   newTag,
  //   showColorPicker,
  //   imagePreview,
  //   isPreviewMode,
  // } = useAppSelector((state) => state.note);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateNoteFormData>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
      color: "#e3f2fd",
      coverImage: "",
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        // dispatch(setImagePreview(result));
        // dispatch(
        //   setFormData({
        //     ...formData,
        //     coverImage: result,
        //   })
        // );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (color: string) => {
    console.log(color);

    // dispatch(
    //   setFormData({
    //     ...formData,
    //     color: color.hex,
    //   })
    // );
  };

  const handleSave = (data: CreateNoteFormData) => {
    console.log(data);

    // const noteData = {
    //   ...data,
    //   tags,
    //   author: "John Doe",
    //   createdAt: new Date().toISOString().split("T")[0],
    //   updatedAt: new Date().toISOString().split("T")[0],
    //   isFavorite: false,
    //   id: Date.now(),
    // };
    // dispatch(setFormData(noteData));
    // console.log("Saving note:", noteData);
    // router.push("/dashboard/notes");
    // dispatch(resetForm());
  };

  const isPreviewMode = false

  return (
    <Box>
      <CreateNoteHeader
        onBack={() => router.back()}
        isPreviewMode={isPreviewMode}
        onSave={handleSubmit(handleSave)}
        onTogglePreview={() => {
          console.log(isPreviewMode);
          // dispatch(setIsPreviewMode(!isPreviewMode))
        }}
      />

      {!isPreviewMode ? (
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            {/* <NoteForm control={control} errors={errors} /> */}
            {/* <TagsSection
              tags={tags}
              newTag={newTag}
              onNewTagChange={(value) => dispatch(setNewTag(value))}
              onAddTag={() => dispatch(addTag())}
              onRemoveTag={(tag) => dispatch(removeTag(tag))}
            /> */}
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            {/* <CoverImageSection
              imagePreview={imagePreview}
              onImageUpload={handleImageUpload}
              onRemoveImage={() => {
                dispatch(setImagePreview(null));
                dispatch(
                  setFormData({
                    ...formData,
                    coverImage: "",
                  })
                );
              }}
            />
            <ColorPickerSection
              color={formData.color}
              showColorPicker={showColorPicker}
              onColorChange={handleColorChange}
              onToggleColorPicker={() =>
                dispatch(setShowColorPicker(!showColorPicker))
              }
            /> */}
          </Grid>
        </Grid>
      ) : (
        <Box>asd</Box>
        // <NotePreview formData={formData} tags={tags} />
      )}
    </Box>
  );
}
